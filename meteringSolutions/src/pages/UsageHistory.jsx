// import React, { useState, useEffect } from 'react';
// import { Calendar, Activity, Filter, Download, ChevronLeft, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { fetchUsageHistorySingleDay, fetchUsageHistory30Days } from '../redux/slice/userDashboardSlice';

// const UsageHistoryDashboard = () => {
//   const [selectedUser] = useState('user_12345'); // Single user as specified
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [dateRange] = useState(30);
//   const [uplinkData, setUplinkData] = useState([]);
//   const [thirtyDayData, setThirtyDayData] = useState([]);
//   const [dailyStats, setDailyStats] = useState({});
//   const [availableDates] = useState(generateDateRange(30));
//   const [filterType, setFilterType] = useState('ALL');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(20);
//   const [viewMode, setViewMode] = useState('single'); // 'single' or '30day'

//   // Load data for selected date or 30-day summary
//   useEffect(() => {
//     dispatch(fetchUsageHistory30Days(selectedUser, dateRange));
//   }, [selectedDate, viewMode]);

//   const filteredData = viewMode === 'single' ? 
//     uplinkData.filter(item => {
//       if (filterType === 'ALL') return true;
//       if (filterType === 'RELAY_ON') return item.relay_status.status === 'ON';
//       if (filterType === 'RELAY_OFF') return item.relay_status.status === 'OFF';
//       if (filterType === 'EB_ACTIVE') return item.eb_dg_status.value === 1;
//       if (filterType === 'DG_ACTIVE') return item.eb_dg_status.value === 0;
//       if (filterType === 'HIGH_VOLTAGE') return item.voltage_r.value > 250;
//       if (filterType === 'LOW_VOLTAGE') return item.voltage_r.value < 220;
//       return true;
//     }) :
//     thirtyDayData.filter(item => {
//       if (filterType === 'ALL') return true;
//       if (filterType === 'HIGH_VOLTAGE') return item.avgVoltage > 250;
//       if (filterType === 'LOW_VOLTAGE') return item.avgVoltage < 220;
//       if (filterType === 'HIGH_RECORDS') return item.totalRecords > 80;
//       if (filterType === 'LOW_RECORDS') return item.totalRecords < 60;
//       return true;
//     });

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const navigateDate = (direction) => {
//     const currentIndex = availableDates.indexOf(selectedDate);
//     if (direction === 'prev' && currentIndex > 0) {
//       setSelectedDate(availableDates[currentIndex - 1]);
//     } else if (direction === 'next' && currentIndex < availableDates.length - 1) {
//       setSelectedDate(availableDates[currentIndex + 1]);
//     }
//   };

//   const exportData = () => {
//     if (viewMode === 'single') {
//       const csvContent = [
//         ['Timestamp', 'Meter Serial', 'EB kWh', 'DG kWh', 'Voltage (V)', 'Current R (A)', 'Power Factor', 'Frequency (Hz)', 'Relay Status', 'Balance Amount', 'EB/DG Status'],
//         ...filteredData.map(item => [
//           item.timestamp.toISOString(),
//           item.meter_serial_number.value,
//           item.cum_eb_kwh.value,
//           item.cum_dg_kwh.value,
//           item.voltage_r.value,
//           item.current_r.value,
//           item.power_factor.value,
//           item.frequency.value,
//           item.relay_status.status,
//           item.balance_amount.value,
//           item.eb_dg_status.value === 1 ? 'EB' : 'DG'
//         ])
//       ].map(row => row.join(',')).join('\n');

//       const blob = new Blob([csvContent], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `meter_single_day_${selectedDate}.csv`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } else {
//       const csvContent = [
//         ['Date', 'Total Records', 'Avg Voltage (V)', 'Max EB kWh', 'Max DG kWh', 'Avg Power Factor', 'Avg Balance', 'Relay ON %', 'EB Active %', 'Unique Meters'],
//         ...filteredData.map(item => [
//           item.date.toISOString().split('T')[0],
//           item.totalRecords,
//           item.avgVoltage,
//           item.maxEbKwh,
//           item.maxDgKwh,
//           item.avgPowerFactor,
//           item.avgBalance,
//           item.relayOnPercentage,
//           item.ebActivePercentage,
//           item.uniqueMeters
//         ])
//       ].map(row => row.join(',')).join('\n');

//       const blob = new Blob([csvContent], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `meter_30_day_history.csv`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-200/10 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//                 <Activity className="text-blue-600" />
//                 Usage History Dashboard
//               </h1>
//               <p className="text-slate-600 mt-2">User: {selectedUser} | Date Range: {dateRange} days</p>
//             </div>
//             <button
//               onClick={exportData}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Download size={20} />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Date Navigation and View Mode Toggle */}
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Calendar className="text-slate-600" />
//               <h2 className="text-xl font-semibold text-slate-800">Date Selection</h2>
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className={`text-sm ${viewMode === 'single' ? 'font-semibold text-blue-600' : 'text-slate-600'}`}>
//                   Single Day
//                 </span>
//                 <button
//                   onClick={() => setViewMode(viewMode === 'single' ? '30day' : 'single')}
//                   className="p-1 rounded-md hover:bg-slate-100 transition-colors"
//                 >
//                   {viewMode === 'single' ? 
//                     <ToggleLeft className="text-blue-600" size={24} /> : 
//                     <ToggleRight className="text-blue-600" size={24} />
//                   }
//                 </button>
//                 <span className={`text-sm ${viewMode === '30day' ? 'font-semibold text-blue-600' : 'text-slate-600'}`}>
//                   30 Day History
//                 </span>
//               </div>


//             </div>
//           </div>
//         </div>

//         {/* Filters and Data Table */}
//         <div className="bg-white rounded-xl shadow-lg border border-slate-200">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Filter className="text-slate-600" />
//                 <h2 className="text-xl font-semibold text-slate-800">
//                   {viewMode === 'single' ? 'Single Day Records' : '30 Day History'}
//                 </h2>
//               </div>
//               <div className="flex items-center gap-4">
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >

//                     <>
//                       <option value="ALL">All Days</option>
//                       <option value="HIGH_VOLTAGE">High Avg Voltage</option>
//                       <option value="LOW_VOLTAGE">Low Avg Voltage</option>
//                       <option value="HIGH_RECORDS">High Activity (&gt;80 records)</option>
//                       <option value="LOW_RECORDS">Low Activity (&lt;60 records)</option>
//                     </>

//                 </select>
//                 <p className="text-sm text-slate-600">
//                   Showing {filteredData.length} of {viewMode === 'single' ? uplinkData.length : thirtyDayData.length} records
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">

//                 <>
//                   <thead className="bg-slate-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Records</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Voltage</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Max EB kWh</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Max DG kWh</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg PF</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Balance</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Relay ON %</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">EB Active %</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Unique Meters</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-slate-200">
//                     {paginatedData.map((item) => (
//                       <tr key={item._id} className="hover:bg-slate-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-semibold">
//                           {item.totalRecords}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           <span className={`${item.avgVoltage > 250 ? 'text-red-600 font-semibold' : 
//                             item.avgVoltage < 220 ? 'text-orange-600 font-semibold' : 'text-slate-900'}`}>
//                             {item.avgVoltage} V
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           {item.maxEbKwh} kWh
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           {item.maxDgKwh} kWh
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           <span className={`${item.avgPowerFactor < 0.5 ? 'text-red-600 font-semibold' : 
//                             item.avgPowerFactor < 0.8 ? 'text-orange-600' : 'text-green-600'}`}>
//                             {item.avgPowerFactor}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           ₹{item.avgBalance}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
//                             {item.relayOnPercentage}%
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                           <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                             {item.ebActivePercentage}%
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-semibold">
//                           {item.uniqueMeters}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </>

//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
//             <div className="text-sm text-slate-600">
//               Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>
//               <span className="px-3 py-1 text-sm text-slate-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsageHistoryDashboard;

import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Filter, Download } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchUsageHistory30Days, selectUserMeterData30Days } from '../redux/slice/userDashboardSlice';
import { useSelector } from 'react-redux';


const UsageHistoryDashboard = () => {
  const dispatch = useDispatch();
  const [selectedUser] = useState('user_12345'); // Single user as specified
  const [dateRange] = useState(30);
  const [filterType, setFilterType] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const dailyMeterData = useSelector(selectUserMeterData30Days);

  // Load 30-day history data
  //fetchUsageHistory30Days
  useEffect(() => {
    console.log('Fetching 30-day usage history for user:');
    dispatch(fetchUsageHistory30Days());
  }, [dispatch, selectedUser, dateRange]);

  console.log('Daily Meter Data:', dailyMeterData);
  const filteredData = dailyMeterData.filter(item => {
    if (filterType === 'ALL') return true;
    if (filterType === 'HIGH_KWH') return parseFloat(item.totalKWh) > 100;
    if (filterType === 'LOW_KWH') return parseFloat(item.totalKWh) < 50;
    if (filterType === 'HIGH_DEDUCTION') return parseFloat(item.totalDeduction) > 50;
    if (filterType === 'LOW_DEDUCTION') return parseFloat(item.totalDeduction) < 10;
    if (filterType === 'HIGH_EG') return parseFloat(item.totalEG) > 50;
    if (filterType === 'HIGH_DG') return parseFloat(item.totalDG) > 50;
    return true;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate summary statistics
  const summaryStats = {
    totalRecords: dailyMeterData.length,
    totalKWh: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalKWh || 0), 0),
    totalDeductions: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDeduction || 0), 0),
    totalEG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalEG || 0), 0),
    totalDG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDG || 0), 0),
    uniqueMeters: new Set(dailyMeterData.map(item => item.meterId)).size
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Meter ID', 'Total kWh', 'Total Deduction', 'Total EG', 'Total DG', 'Created At'],
      ...filteredData.map(item => [
        new Date(item.date).toISOString().split('T')[0],
        item.meterId,
        item.totalKWh,
        item.totalDeduction,
        item.totalEG,
        item.totalDG,
        new Date(item.createdAt).toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily_meter_summary_30_days.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-blue-200/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Activity className="text-blue-600" />
                Daily Meter Summary - 30 Days
              </h1>
              <p className="text-slate-600 mt-2">User: {selectedUser} | Historical Data: Last {dateRange} days</p>
            </div>
            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="text-slate-600" />
            <h2 className="text-xl font-semibold text-slate-800">30-Day Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total Records</p>
              <p className="text-2xl font-bold text-blue-600">{summaryStats.totalRecords}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total kWh</p>
              <p className="text-2xl font-bold text-green-600">{summaryStats.totalKWh.toFixed(2)}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total Deductions</p>
              <p className="text-2xl font-bold text-red-600">₹{summaryStats.totalDeductions.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total EG</p>
              <p className="text-2xl font-bold text-purple-600">{summaryStats.totalEG.toFixed(2)}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total DG</p>
              <p className="text-2xl font-bold text-orange-600">{summaryStats.totalDG.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Unique Meters</p>
              <p className="text-2xl font-bold text-indigo-600">{summaryStats.uniqueMeters}</p>
            </div>
          </div>
        </div>

        {/* Filters and Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Filter className="text-slate-600" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Daily Meter Data
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Records</option>
                  <option value="HIGH_KWH">High kWh (&gt;100)</option>
                  <option value="LOW_KWH">Low kWh (&lt;50)</option>
                  <option value="HIGH_DEDUCTION">High Deduction (&gt;₹50)</option>
                  <option value="LOW_DEDUCTION">Low Deduction (&lt;₹10)</option>
                  <option value="HIGH_EG">High EG (&gt;50)</option>
                  <option value="HIGH_DG">High DG (&gt;50)</option>
                </select>
                <p className="text-sm text-slate-600">
                  Showing {filteredData.length} of {dailyMeterData.length} records
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Meter ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total kWh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Deduction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total EG</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total DG</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {paginatedData.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
                      {item.meterId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <span className={`${parseFloat(item.totalKWh) > 100 ? 'text-green-600 font-semibold' :
                        parseFloat(item.totalKWh) < 50 ? 'text-orange-600' : 'text-slate-900'}`}>
                        {parseFloat(item.totalKWh).toFixed(2)} kWh
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <span className={`${parseFloat(item.totalDeduction) > 50 ? 'text-red-600 font-semibold' :
                        parseFloat(item.totalDeduction) < 10 ? 'text-green-600' : 'text-slate-900'}`}>
                        ₹{parseFloat(item.totalDeduction).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <span className="text-purple-600 font-medium">
                        {parseFloat(item.totalEG).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <span className="text-orange-600 font-medium">
                        {parseFloat(item.totalDG).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageHistoryDashboard;