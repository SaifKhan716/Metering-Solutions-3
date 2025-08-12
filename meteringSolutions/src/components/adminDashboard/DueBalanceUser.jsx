import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { adminDashboard } from "../../api/apiService";

const StatusPill = ({ status }) => (
  <span
    className={`inline-block capitalize text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${
      status === "online"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status || "Offline"}
  </span>
);

const DueBalanceUser = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { adminId } = useParams();

  const fetchData = async () => {
    try {
      // const res = await axios.get(
      //   `http://localhost:3005/api/v1/user/negative-payments/${adminId}`
      // );

      const res = await adminDashboard.getDueBalanceUser(adminId);
      setData(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch negative payments:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [adminId]);

  const filteredData = data.filter(({ meter, assignedUser, payment }) => {
    const search = searchText.toLowerCase();
    const lastUpdated = payment?.updatedAt ? new Date(payment.updatedAt) : null;

    const matchesText =
      meter?.meterId?.toLowerCase().includes(search) ||
      meter?.name?.toLowerCase().includes(search) ||
      assignedUser?.name?.toLowerCase().includes(search);

    const matchesStart = startTime
      ? lastUpdated && lastUpdated >= new Date(startTime)
      : true;
    const matchesEnd = endTime
      ? lastUpdated && lastUpdated <= new Date(endTime)
      : true;

    return matchesText && matchesStart && matchesEnd;
  });

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-4 lg:p-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">
          Due Balance
        </h1>
        <p className="text-sm text-gray-600 hidden sm:block">
          Search and filter meters with negative balance.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col justify-between sm:flex-row sm:items-end gap-4 flex-wrap">
          {/* Search Input */}
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Search
            </label>
            <input
              type="text"
              placeholder="Search Meter ID, User Name, Meter Name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>

          {/* Date Filters */}
          <div className="flex gap-6 w-full sm:w-auto">
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>No due balances found</p>
          </div>
        ) : (
          filteredData.map(({ meter, assignedUser, payment }, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5"
            >
              <div className="text-sm w-full grid grid-cols-2 sm:grid-cols-7 gap-4 text-center">
                {/* Meter ID */}
                <div className="min-w-0">
                  <p className="text-md font-semibold text-gray-500">
                    Meter ID
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-blue-600 break-all">
                    {meter?.meterId}
                  </p>
                </div>

                {/* User */}
                <div>
                  <p className="text-md font-semibold text-gray-500">User</p>
                  <p className="text-sm sm:text-base font-medium">
                    {assignedUser?.name || "Unassigned"}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-md font-semibold text-gray-500">Phone</p>
                  <p className="text-sm break-words">
                    {assignedUser?.phone || "Unassigned"}
                  </p>
                </div>

                {/* Meter Name */}
                <div>
                  <p className="text-md font-semibold text-gray-500">
                    Meter Name
                  </p>
                  <p className="text-sm">{meter?.name}</p>
                </div>

                {/* Due Balance */}
                <div>
                  <p className="text-md font-semibold text-gray-500">
                    Due Balance
                  </p>
                  <p className="text-red-600 font-bold text-base sm:text-lg">
                    ₹{(payment?.amount ?? 0).toFixed(2)}
                  </p>
                </div>

                {/* Last Updated */}
                <div>
                  <p className="text-md font-semibold text-gray-500">
                    Last Updated
                  </p>
                  <p className="text-sm text-blue-700">
                    {payment?.updatedAt
                      ? format(new Date(payment.updatedAt), "dd/MM/yyyy HH:mm")
                      : "N/A"}
                  </p>
                </div>

                {/* Status */}
                <div className="">
                  <p className="text-md font-semibold text-gray-500">status</p>
                  <StatusPill status={meter?.status || "offline"} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DueBalanceUser;