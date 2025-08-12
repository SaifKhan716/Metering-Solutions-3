


// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   Clock,
//   User,
//   Hash,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   Wifi,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   ChevronLeft,
// } from "lucide-react";


// import { useDispatch, useSelector } from "react-redux";
// // Auth selectors
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";

// // Notification selectors & actions
// import {


//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser
// } from "../redux/slice/notificationSlice";
// import { fetchAdminNotifications,fetchUserNotifications,toggleNotificationStatus, } from "../redux/thunks/notificationThunks";





// const AlertAndNotification = () => {

//     const [searchTerm, setSearchTerm] = useState("");

//   const dispatch = useDispatch();

//   // 🔹 Get auth data from Redux
//   const userId = useSelector(selectUserId);
//   // const userRole = useSelector(selectUserRole);
//     const userRole = useSelector(selectUserRole);

//   // 🔹 Get notification data from Redux
//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Initial setup
//   useEffect(() => {
//     dispatch(setHeaderTitle("Notification"));
//     dispatch(setBreadcrumbs([
//       { label: "Notifications", link: "/alertandnotification" },
//     ]));
//   }, [dispatch]);

//   // Fetch notifications when role/tab changes
//   useEffect(() => {
//     if (userRole === "admin" && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (userRole === "admin" && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (userRole === "user") {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [userRole, selectedUser, activeTab, userId, dispatch]);

//   // // Toggle all notifications for a user

  


//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//   if (selectedUser) {
//     try {
//       await dispatch(toggleNotificationStatus({ 
//         userId: selectedUser, 
//         status: newStatus 
//       })).unwrap();
      
//       // No need to refetch here since we're updating optimistically
//     } catch (error) {
//       toast.error("Failed to update notification status");
//     }
//   }
// };

// // Toggle single user's notifications
// const handleToggleUserStatus = async (userId, newStatus) => {
//   try {
//     await dispatch(toggleNotificationStatus({ 
//       userId, 
//       status: newStatus 
//     })).unwrap();
//   } catch (error) {
//     toast.error("Failed to update user notification status");
//   }
// };
//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//   };


//   // Filtered lists for search functionality
// const filteredUsers = usersList?.filter((user) => {
//   const matchesSearch =
//     searchTerm === "" ||
//     user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//   return matchesSearch;
// });



// const filteredNotifications = userNotifications?.filter((notification) => {
//   const matchesSearch =
//     searchTerm === "" ||
//     notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.message?.toLowerCase().includes(searchTerm.toLowerCase());
//   return matchesSearch;
// }) || [];

// const filteredAdminNotifications = adminNotifications?.filter((notification) => {
//   const matchesSearch =
//     searchTerm === "" ||
//     notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase());
//   return matchesSearch;
// }) || [];

//   const currentItems =
//     userRole === "user" || selectedUser
//       ? filteredNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : activeTab === "adminNotifications"
//       ? filteredAdminNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : filteredUsers.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         );

//   const totalPages = Math.ceil(
//     (userRole === "user" || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredAdminNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Get alert icon and colors (keep your existing implementation)
//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//       // ... (keep all your existing color mappings)
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search - For notification details view */}
//         {(userRole === "user" || selectedUser) && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Notification Status
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {userNotifications?.status === "enabled"
//                       ? "All notifications are currently enabled"
//                       : "Notifications are currently disabled"}
//                   </p>
//                 </div>
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 handleToggleGlobalNotificationStatus(
//                   userNotifications?.status === "enabled"
//                     ? "disabled"
//                     : "enabled"
//                 )
//               }
//               className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//                 userNotifications?.status === "enabled"
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//             >
//               {userNotifications?.status === "enabled"
//                 ? "Disable Notification"
//                 : "Enable Notification"}
//             </button>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Search input moved here for admin view */}
//               {userRole === "admin" && !selectedUser && (
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder={
//                       activeTab === "adminNotifications"
//                         ? "Search admin notifications..."
//                         : "Search by user ID or meter ID..."
//                     }
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               )}

//               <div className="flex items-center gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   {userRole === "user"
//                     ? "Your Notifications"
//                     : selectedUser
//                     ? `Notifications for ${selectedUser}`
//                     : "Notification Management"}
//                 </h2>

//                 {/* Admin tabs - only shown when in admin view and no user selected */}
//                 {userRole === "admin" && !selectedUser && (
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setActiveTab("users")}
//                       className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                         activeTab === "users"
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Users
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("adminNotifications")}
//                       className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                         activeTab === "adminNotifications"
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Admin Notifications
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {selectedUser && (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               )}
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : userRole === "user" || selectedUser ? (
//               <div className="space-y-4">
//                 {filteredNotifications.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((notification) => {
//                       const colors = getAlertColors(notification.alertType);
//                       return (
//                         <div
//                           key={notification._id}
//                           className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                               <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                 <span className={colors.icon}>
//                                   {getAlertIcon(notification.alertType)}
//                                 </span>
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                   <h3 className="font-semibold text-gray-900">
//                                     {notification.alertType}
//                                   </h3>
//                                   <span
//                                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                       notification.mode.includes("Text")
//                                         ? "text-blue-600 bg-blue-100"
//                                         : "text-purple-600 bg-purple-100"
//                                     }`}
//                                   >
//                                     {notification.mode}
//                                   </span>
//                                 </div>

//                                 <p className="text-gray-700 mb-3">
//                                   {notification.message}
//                                 </p>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Value:
//                                     </span>
//                                     <div className="text-gray-900 font-semibold">
//                                       {notification.value}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Time:
//                                     </span>
//                                     <div className="text-gray-900">
//                                       {new Date(
//                                         notification.time
//                                       ).toLocaleString()}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "You're all caught up!"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : activeTab === "adminNotifications" ? (
//               <div className="space-y-4">
//                 {filteredAdminNotifications.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((notification) => {
//                       const colors = getAlertColors(notification.alertType);
//                       return (
//                         <div
//                           key={notification._id}
//                           className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                               <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                 <span className={colors.icon}>
//                                   {getAlertIcon(notification.alertType)}
//                                 </span>
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                   <h3 className="font-semibold text-gray-900">
//                                     {notification.alertType}
//                                   </h3>
//                                   <span className="text-sm text-gray-600">
//                                     User: {notification.userName || "Unknown"}
//                                   </span>
//                                   <span
//                                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                       notification.mode.includes("Text")
//                                         ? "text-blue-600 bg-blue-100"
//                                         : "text-purple-600 bg-purple-100"
//                                     }`}
//                                   >
//                                     {notification.mode}
//                                   </span>
//                                 </div>

//                                 <p className="text-gray-700 mb-3">
//                                   {notification.message}
//                                 </p>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Value:
//                                     </span>
//                                     <div className="text-gray-900 font-semibold">
//                                       {notification.value}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Time:
//                                     </span>
//                                     <div className="text-gray-900">
//                                       {new Date(
//                                         notification.time
//                                       ).toLocaleString()}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No admin notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "No admin notifications available"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredUsers.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((user) => (
//                       <div
//                         key={user._id}
//                         className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                         onClick={() => handleUserSelection(user.userId)}
//                       >
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
//                           <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
//                             <div className="p-2 rounded-lg bg-gray-100">
//                               <User className="h-5 w-5 text-gray-600" />
//                             </div>
//                             <div>
//                               <h3 className="font-semibold text-gray-900">
//                                 {user.userName}
//                               </h3>
//                               <p className="text-sm text-gray-600">
//                                 Meter: {user.meterName} ({user.meterId})
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 w-full sm:w-auto">
//                             <div className="text-left sm:text-right mb-3 sm:mb-0">
//                               <div className="text-sm font-medium text-gray-900">
//                                 Last Notification:{" "}
//                                 {user.lastNotificationDate
//                                   ? new Date(
//                                       user.lastNotificationDate
//                                     ).toLocaleDateString()
//                                   : "Never"}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {user.notificationCount} notifications
//                               </div>
//                             </div>

//                             <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleToggleUserStatus(
//                                     user.userId,
//                                     user.status === "enabled"
//                                       ? "disabled"
//                                       : "enabled"
//                                   );
//                                 }}
//                                 className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                   user.status === "enabled"
//                                     ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                     : "bg-green-100 hover:bg-green-200 text-green-600"
//                                 }`}
//                               >
//                                 {user.status === "enabled"
//                                   ? "Disable"
//                                   : "Enable"}
//                               </button>
//                               <ChevronRight className="h-5 w-5 text-gray-400" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No users notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "No users available"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {(filteredNotifications.length > itemsPerPage ||
//               filteredUsers.length > itemsPerPage ||
//               filteredAdminNotifications.length > itemsPerPage) && (
//               <div className="flex items-center justify-between mt-6">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     userRole === "user" || selectedUser
//                       ? filteredNotifications.length
//                       : activeTab === "adminNotifications"
//                       ? filteredAdminNotifications.length
//                       : filteredUsers.length
//                   )}{" "}
//                   of{" "}
//                   {userRole === "user" || selectedUser
//                     ? filteredNotifications.length
//                     : activeTab === "adminNotifications"
//                     ? filteredAdminNotifications.length
//                     : filteredUsers.length}{" "}
//                   items
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;

















// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   Clock,
//   User,
//   Hash,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   Wifi,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   ChevronLeft,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import {
//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser,
//   updateUserStatus
// } from "../redux/slice/notificationSlice";
// import { 
//   fetchAdminNotifications,
//   fetchUserNotifications,
//   toggleNotificationStatus,
// } from "../redux/thunks/notificationThunks";

// const AlertAndNotification = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   // Auth data
//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);

//   // Notification data
//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Initial setup
//   useEffect(() => {
//     dispatch(setHeaderTitle("Notification"));
//     dispatch(setBreadcrumbs([
//       { label: "Notifications", link: "/alertandnotification" },
//     ]));
//   }, [dispatch]);

//   // Fetch notifications when role/tab changes
//   useEffect(() => {
//     if (userRole === "admin" && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (userRole === "admin" && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (userRole === "user") {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [userRole, selectedUser, activeTab, userId, dispatch]);

//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//     if (selectedUser) {
//       try {
//         // Optimistically update the state
//         dispatch(updateUserStatus({ userId: selectedUser, status: newStatus }));
        
//         // Then make the API call
//         await dispatch(toggleNotificationStatus({ 
//           userId: selectedUser, 
//           status: newStatus 
//         })).unwrap();
//       } catch (error) {
//         toast.error("Failed to update notification status");
//         // Revert the optimistic update if the API call fails
//         dispatch(updateUserStatus({ 
//           userId: selectedUser, 
//           status: newStatus === "enabled" ? "disabled" : "enabled" 
//         }));
//       }
//     }
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update user notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId, 
//         status: currentStatus 
//       }));
//     }
//   };

//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//   };

//   // Filtered lists for search functionality
//   const filteredUsers = usersList?.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   const filteredNotifications = userNotifications?.filter((notification) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.message?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   }) || [];

//   const filteredAdminNotifications = adminNotifications?.filter((notification) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   }) || [];

//   const currentItems =
//     userRole === "user" || selectedUser
//       ? filteredNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : activeTab === "adminNotifications"
//       ? filteredAdminNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : filteredUsers.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         );

//   const totalPages = Math.ceil(
//     (userRole === "user" || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredAdminNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Get alert icon and colors
//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//       // ... (other color mappings)
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search - For notification details view */}
//         {(userRole === "user" || selectedUser) && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Notification Status
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {userNotifications[0]?.status === "enabled"
//                       ? "All notifications are currently enabled"
//                       : "Notifications are currently disabled"}
//                   </p>
//                 </div>
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 handleToggleGlobalNotificationStatus(
//                   userNotifications[0]?.status === "enabled"
//                     ? "disabled"
//                     : "enabled"
//                 )
//               }
//               className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//                 userNotifications[0]?.status === "enabled"
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//             >
//               {userNotifications[0]?.status === "enabled"
//                 ? "Disable Notification"
//                 : "Enable Notification"}
//             </button>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Search input moved here for admin view */}
//               {userRole === "admin" && !selectedUser && (
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder={
//                       activeTab === "adminNotifications"
//                         ? "Search admin notifications..."
//                         : "Search by user ID or meter ID..."
//                     }
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               )}

//               <div className="flex items-center gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   {userRole === "user"
//                     ? "Your Notifications"
//                     : selectedUser
//                     ? `Notifications for ${usersList.find(u => u.userId === selectedUser)?.userName || selectedUser}`
//                     : "Notification Management"}
//                 </h2>

//                 {/* Admin tabs - only shown when in admin view and no user selected */}
//                 {userRole === "admin" && !selectedUser && (
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setActiveTab("users")}
//                       className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                         activeTab === "users"
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Users
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("adminNotifications")}
//                       className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                         activeTab === "adminNotifications"
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Admin Notifications
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {selectedUser && (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               )}
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : userRole === "user" || selectedUser ? (
//               <div className="space-y-4">
//                 {filteredNotifications.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((notification) => {
//                       const colors = getAlertColors(notification.alertType);
//                       return (
//                         <div
//                           key={notification._id}
//                           className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                               <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                 <span className={colors.icon}>
//                                   {getAlertIcon(notification.alertType)}
//                                 </span>
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                   <h3 className="font-semibold text-gray-900">
//                                     {notification.alertType}
//                                   </h3>
//                                   <span
//                                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                       notification.mode.includes("Text")
//                                         ? "text-blue-600 bg-blue-100"
//                                         : "text-purple-600 bg-purple-100"
//                                     }`}
//                                   >
//                                     {notification.mode}
//                                   </span>
//                                 </div>

//                                 <p className="text-gray-700 mb-3">
//                                   {notification.message}
//                                 </p>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Value:
//                                     </span>
//                                     <div className="text-gray-900 font-semibold">
//                                       {notification.value}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Time:
//                                     </span>
//                                     <div className="text-gray-900">
//                                       {new Date(
//                                         notification.time
//                                       ).toLocaleString()}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "You're all caught up!"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : activeTab === "adminNotifications" ? (
//               <div className="space-y-4">
//                 {filteredAdminNotifications.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((notification) => {
//                       const colors = getAlertColors(notification.alertType);
//                       return (
//                         <div
//                           key={notification._id}
//                           className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                               <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                 <span className={colors.icon}>
//                                   {getAlertIcon(notification.alertType)}
//                                 </span>
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                   <h3 className="font-semibold text-gray-900">
//                                     {notification.alertType}
//                                   </h3>
//                                   <span className="text-sm text-gray-600">
//                                     User: {notification.userName || "Unknown"}
//                                   </span>
//                                   <span
//                                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                       notification.mode.includes("Text")
//                                         ? "text-blue-600 bg-blue-100"
//                                         : "text-purple-600 bg-purple-100"
//                                     }`}
//                                   >
//                                     {notification.mode}
//                                   </span>
//                                 </div>

//                                 <p className="text-gray-700 mb-3">
//                                   {notification.message}
//                                 </p>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Value:
//                                     </span>
//                                     <div className="text-gray-900 font-semibold">
//                                       {notification.value}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <span className="font-medium text-gray-600">
//                                       Time:
//                                     </span>
//                                     <div className="text-gray-900">
//                                       {new Date(
//                                         notification.time
//                                       ).toLocaleString()}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No admin notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "No admin notifications available"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredUsers.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentItems.map((user) => (
//                       <div
//                         key={user._id}
//                         className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                         onClick={() => handleUserSelection(user.userId)}
//                       >
//                         <div className="flex flex-col">
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="p-2 rounded-lg bg-gray-100">
//                                 <User className="h-5 w-5 text-gray-600" />
//                               </div>
//                               <div>
//                                 <h3 className="font-semibold text-gray-900">
//                                   {user.userName}
//                                 </h3>
//                                 <p className="text-sm text-gray-600">
//                                   ID: {user.userId}
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleToggleUserStatus(user.userId, user.status);
//                                 }}
//                                 className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                   user.status === "enabled"
//                                     ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                     : "bg-green-100 hover:bg-green-200 text-green-600"
//                                 }`}
//                               >
//                                 {user.status === "enabled"
//                                   ? "Disable"
//                                   : "Enable"}
//                               </button>
//                               <ChevronRight className="h-5 w-5 text-gray-400" />
//                             </div>
//                           </div>

//                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
//                             <div>
//                               <p className="text-gray-500">Meter ID</p>
//                               <p className="font-medium">{user.meterId}</p>
//                             </div>
//                             <div>
//                               <p className="text-gray-500">Last Notification</p>
//                               <p className="font-medium">
//                                 {user.lastNotificationDate
//                                   ? new Date(user.lastNotificationDate).toLocaleDateString()
//                                   : "Never"}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-gray-500">Notification Count</p>
//                               <p className="font-medium">{user.notificationCount}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No users notifications found
//                     </h3>
//                     <p className="text-gray-600">
//                       {searchTerm
//                         ? "Try adjusting your search criteria"
//                         : "No users available"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {(filteredNotifications.length > itemsPerPage ||
//               filteredUsers.length > itemsPerPage ||
//               filteredAdminNotifications.length > itemsPerPage) && (
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     userRole === "user" || selectedUser
//                       ? filteredNotifications.length
//                       : activeTab === "adminNotifications"
//                       ? filteredAdminNotifications.length
//                       : filteredUsers.length
//                   )}{" "}
//                   of{" "}
//                   {userRole === "user" || selectedUser
//                     ? filteredNotifications.length
//                     : activeTab === "adminNotifications"
//                     ? filteredAdminNotifications.length
//                     : filteredUsers.length}{" "}
//                   items
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;















// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   Clock,
//   User,
//   Hash,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   Wifi,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   ChevronLeft,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import {
//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser,
//   updateUserStatus
// } from "../redux/slice/notificationSlice";
// import { 
//   fetchAdminNotifications,
//   fetchUserNotifications,
//   toggleNotificationStatus,
// } from "../redux/thunks/notificationThunks";

// const AlertAndNotification = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   // Auth data
//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//     // const userRole = "user"
//   const isAdmin = userRole === "admin";
//   const isUser = userRole === "user";

//   // Notification data
//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   // For admin view
//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Initial setup
//   useEffect(() => {
//     dispatch(setHeaderTitle("Notifications"));
//     dispatch(setBreadcrumbs([
//       { label: "Notifications", link: "/alertandnotification" },
//     ]));
//   }, [dispatch]);

//   // Fetch notifications based on role and view
//   useEffect(() => {
//     if (isAdmin && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (isAdmin && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (isUser) {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//     const targetUserId = selectedUser || userId;
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId: targetUserId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId: targetUserId, 
//         status: newStatus === "enabled" ? "disabled" : "enabled" 
//       }));
//     }
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update user notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId, 
//         status: currentStatus 
//       }));
//     }
//   };

//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//   };

//   // Filter notifications based on search term
//   const filteredNotifications = (isUser || selectedUser ? userNotifications : adminNotifications)?.filter((notification) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (isAdmin && !selectedUser && (
//         notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase())
//       ));
//     return matchesSearch;
//   }) || [];

//   // Filter users list for admin view
//   const filteredUsers = usersList?.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   // Get current items to display
//   const currentItems = isUser || selectedUser
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : activeTab === "adminNotifications"
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : filteredUsers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       );

//   const totalPages = Math.ceil(
//     (isUser || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Get alert icon and colors
//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//       // ... (other color mappings)
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex-1">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//               <div>
//                 <h3 className="font-medium text-gray-900">
//                   Notification Status
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {userNotifications[0]?.status === "enabled"
//                     ? "All notifications are currently enabled"
//                     : "Notifications are currently disabled"}
//                 </p>
//               </div>
//               <div className="relative w-full sm:w-64">
//                 <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search notifications..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() =>
//               handleToggleGlobalNotificationStatus(
//                 userNotifications[0]?.status === "enabled"
//                   ? "disabled"
//                   : "enabled"
//               )
//             }
//             className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//               userNotifications[0]?.status === "enabled"
//                 ? "bg-red-600 hover:bg-red-700 text-white"
//                 : "bg-green-600 hover:bg-green-700 text-white"
//             }`}
//           >
//             {userNotifications[0]?.status === "enabled"
//               ? "Disable Notification"
//               : "Enable Notification"}
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Title */}
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {isUser
//                   ? "Your Notifications"
//                   : selectedUser
//                   ? `Notifications for ${usersList.find(u => u.userId === selectedUser)?.userName || selectedUser}`
//                   : "Notification Management"}
//               </h2>

//               {/* Admin tabs - only shown when in admin view and no user selected */}
//               {isAdmin && !selectedUser && (
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setActiveTab("users")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "users"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Users
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("adminNotifications")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "adminNotifications"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Admin Notifications
//                   </button>
//                 </div>
//               )}

//               {selectedUser && (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               )}
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* User Notifications View (for both regular users and admin viewing a specific user) */}
//                 {(isUser || selectedUser) && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "You're all caught up!"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Admin Notifications View */}
//                 {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span className="text-sm text-gray-600">
//                                         User: {notification.userName || "Unknown"}
//                                       </span>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No admin notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No admin notifications available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Users List View (Admin only) */}
//                 {isAdmin && !selectedUser && activeTab === "users" && (
//                   <>
//                     {filteredUsers.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((user) => (
//                           <div
//                             key={user._id}
//                             className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                             onClick={() => handleUserSelection(user.userId)}
//                           >
//                             <div className="flex flex-col">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="p-2 rounded-lg bg-gray-100">
//                                     <User className="h-5 w-5 text-gray-600" />
//                                   </div>
//                                   <div>
//                                     <h3 className="font-semibold text-gray-900">
//                                       {user.userName}
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                       ID: {user.userId}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleToggleUserStatus(user.userId, user.status);
//                                     }}
//                                     className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                       user.status === "enabled"
//                                         ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                         : "bg-green-100 hover:bg-green-200 text-green-600"
//                                     }`}
//                                   >
//                                     {user.status === "enabled"
//                                       ? "Disable"
//                                       : "Enable"}
//                                   </button>
//                                   <ChevronRight className="h-5 w-5 text-gray-400" />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
//                                 <div>
//                                   <p className="text-gray-500">Meter ID</p>
//                                   <p className="font-medium">{user.meterId}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Last Notification</p>
//                                   <p className="font-medium">
//                                     {user.lastNotificationDate
//                                       ? new Date(user.lastNotificationDate).toLocaleDateString()
//                                       : "Never"}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Notification Count</p>
//                                   <p className="font-medium">{user.notificationCount}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No users found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No users available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {filteredNotifications.length > itemsPerPage && (
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     filteredNotifications.length
//                   )}{" "}
//                   of {filteredNotifications.length} items
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;
















// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   Clock,
//   User,
//   Hash,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   Wifi,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   ChevronLeft,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import {
//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser,
//   updateUserStatus
// } from "../redux/slice/notificationSlice";
// import { 
//   fetchAdminNotifications,
//   fetchUserNotifications,
//   toggleNotificationStatus,
// } from "../redux/thunks/notificationThunks";

// const AlertAndNotification = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   // Auth data
//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//     // const userRole = "user"
//   const isAdmin = userRole === "admin";
//   const isUser = userRole === "user";

//   // Notification data
//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   // For admin view
//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Initial setup
//   useEffect(() => {
//     dispatch(setHeaderTitle("Notifications"));
//     dispatch(setBreadcrumbs([
//       { label: "Notifications", link: "/alertandnotification" },
//     ]));
//   }, [dispatch]);

//   // Fetch notifications based on role and view
//   useEffect(() => {
//     if (isAdmin && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (isAdmin && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (isUser) {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//     const targetUserId = selectedUser || userId;
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId: targetUserId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId: targetUserId, 
//         status: newStatus === "enabled" ? "disabled" : "enabled" 
//       }));
//     }
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update user notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId, 
//         status: currentStatus 
//       }));
//     }
//   };

//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//   };

//   // Filter notifications based on search term
//   const filteredNotifications = (isUser || selectedUser ? userNotifications : adminNotifications)?.filter((notification) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (isAdmin && !selectedUser && (
//         notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase())
//       ));
//     return matchesSearch;
//   }) || [];

//   // Filter users list for admin view
//   const filteredUsers = usersList?.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   // Get current items to display
//   const currentItems = isUser || selectedUser
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : activeTab === "adminNotifications"
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : filteredUsers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       );

//   const totalPages = Math.ceil(
//     (isUser || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Get alert icon and colors
//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//       // ... (other color mappings)
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   // Determine if we should show the global notification toggle
//   const showGlobalToggle = !(isAdmin && !selectedUser && activeTab === "users");

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search */}
//         {showGlobalToggle && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Notification Status
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {userNotifications[0]?.status === "enabled"
//                       ? "All notifications are currently enabled"
//                       : "Notifications are currently disabled"}
//                   </p>
//                 </div>
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 handleToggleGlobalNotificationStatus(
//                   userNotifications[0]?.status === "enabled"
//                     ? "disabled"
//                     : "enabled"
//                 )
//               }
//               className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//                 userNotifications[0]?.status === "enabled"
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//             >
//               {userNotifications[0]?.status === "enabled"
//                 ? "Disable Notification"
//                 : "Enable Notification"}
//             </button>
//           </div>
//         )}

//         {/* Main Content */}
//         {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200"> */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full h-full">


//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Title */}
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {isUser
//                   ? "Your Notifications"
//                   : selectedUser
//                   ? `Notifications for ${usersList.find(u => u.userId === selectedUser)?.userName || selectedUser}`
//                   : "Notification Management"}
//               </h2>

//                        <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>

//               {/* Admin tabs - only shown when in admin view and no user selected */}
//               {isAdmin && !selectedUser && (
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setActiveTab("users")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "users"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Users
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("adminNotifications")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "adminNotifications"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Admin Notifications
//                   </button>
//                 </div>
//               )}

//               {selectedUser && (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               )}
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* User Notifications View (for both regular users and admin viewing a specific user) */}
//                 {(isUser || selectedUser) && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "You're all caught up!"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Admin Notifications View */}
//                 {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span className="text-sm text-gray-600">
//                                         User: {notification.userName || "Unknown"}
//                                       </span>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No admin notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No admin notifications available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Users List View (Admin only) */}
//                 {isAdmin && !selectedUser && activeTab === "users" && (
//                   <>
//                     {filteredUsers.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((user) => (
//                           <div
//                             key={user._id}
//                             className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                             onClick={() => handleUserSelection(user.userId)}
//                           >
//                             <div className="flex flex-col">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="p-2 rounded-lg bg-gray-100">
//                                     <User className="h-5 w-5 text-gray-600" />
//                                   </div>
//                                   <div>
//                                     <h3 className="font-semibold text-gray-900">
//                                       {user.userName}
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                       ID: {user.userId}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleToggleUserStatus(user.userId, user.status);
//                                     }}
//                                     className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                       user.status === "enabled"
//                                         ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                         : "bg-green-100 hover:bg-green-200 text-green-600"
//                                     }`}
//                                   >
//                                     {user.status === "enabled"
//                                       ? "Disable"
//                                       : "Enable"}
//                                   </button>
//                                   <ChevronRight className="h-5 w-5 text-gray-400" />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
//                                 <div>
//                                   <p className="text-gray-500">Meter ID</p>
//                                   <p className="font-medium">{user.meterId}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Last Notification</p>
//                                   <p className="font-medium">
//                                     {user.lastNotificationDate
//                                       ? new Date(user.lastNotificationDate).toLocaleDateString()
//                                       : "Never"}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Notification Count</p>
//                                   <p className="font-medium">{user.notificationCount}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No users found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No users available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {filteredNotifications.length > itemsPerPage && (
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     filteredNotifications.length
//                   )}{" "}
//                   of {filteredNotifications.length} items
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;
















import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Zap,
  TrendingUp,
  Battery,
  Clock,
  User,
  Hash,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Shield,
  Activity,
  Wifi,
  AlertCircle,
  Gift,
  BarChart3,
  WifiOff,
  Magnet,
  ChevronLeft,
  User2,
  UserCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import {
  setSelectedUser,
  selectUserNotifications,
  selectAdminNotifications,
  selectUsersList,
  selectNotificationsLoading,
  selectNotificationsError,
  selectSelectedUser,
  updateUserStatus
} from "../redux/slice/notificationSlice";
import { 
  fetchAdminNotifications,
  fetchUserNotifications,
  toggleNotificationStatus,
} from "../redux/thunks/notificationThunks";

const AlertAndNotification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Auth data
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";

  // Notification data
  
  // const {
  //   notifications,
    
  //   users,
  //   status: fetchStatus,
  // } = useSelector((state) => state.notifications);
  const userNotifications = useSelector(selectUserNotifications);
  const adminNotifications = useSelector(selectAdminNotifications);
  const usersList = useSelector(selectUsersList);


  
  const loading = useSelector(selectNotificationsLoading);
  const error = useSelector(selectNotificationsError);
  const selectedUser = useSelector(selectSelectedUser);
// console.log("====statuess====", useSelector((state) => state));

  // For admin view
  const [activeTab, setActiveTab] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Initial setup
  useEffect(() => {
    dispatch(setHeaderTitle("Notifications"));
    dispatch(setBreadcrumbs([
      { label: "Notifications", link: "/alertandnotification" },
    ]));
  }, [dispatch]);

  // Fetch notifications based on role and view
  useEffect(() => {
    if (isAdmin && !selectedUser && activeTab === "users") {
      dispatch(fetchAdminNotifications(userId));
    } else if (isAdmin && activeTab === "adminNotifications") {
      dispatch(fetchAdminNotifications(userId));
    } else if (selectedUser) {
      dispatch(fetchUserNotifications(selectedUser));
    } else if (isUser) {
      dispatch(fetchUserNotifications(userId));
    }
  }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

  const handleToggleGlobalNotificationStatus = async (newStatus) => {
    const targetUserId = selectedUser || userId;
    try {
      // Optimistically update the state
      dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
      
      // Then make the API call
      await dispatch(toggleNotificationStatus({ 
        userId: targetUserId, 
        status: newStatus 
      })).unwrap();
    } catch (error) {
      toast.error("Failed to update notification status");
      // Revert the optimistic update if the API call fails
      dispatch(updateUserStatus({ 
        userId: targetUserId, 
        status: newStatus === "enabled" ? "disabled" : "enabled" 
      }));
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
    try {
      // Optimistically update the state
      dispatch(updateUserStatus({ userId, status: newStatus }));
      
      // Then make the API call
      await dispatch(toggleNotificationStatus({ 
        userId, 
        status: newStatus 
      })).unwrap();
    } catch (error) {
      toast.error("Failed to update user notification status");
      // Revert the optimistic update if the API call fails
      dispatch(updateUserStatus({ 
        userId, 
        status: currentStatus 
      }));
    }
  };

  const handleUserSelection = (userId) => {
    dispatch(setSelectedUser(userId));
    setCurrentPage(1);
  };

  const handleBackToList = () => {
    dispatch(setSelectedUser(null));
    setCurrentPage(1);
  };

  // Filter notifications based on search term
  const filteredNotifications = (isUser || selectedUser ? userNotifications : adminNotifications)?.filter((notification) => {
    const matchesSearch =
      searchTerm === "" ||
      notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isAdmin && !selectedUser && (
        notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    return matchesSearch;
  }) || [];

  // Filter users list for admin view
  const filteredUsers = usersList?.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get current items to display
  const currentItems = isUser || selectedUser
    ? filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : activeTab === "adminNotifications"
    ? filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const totalPages = Math.ceil(
    (isUser || selectedUser
      ? filteredNotifications.length
      : activeTab === "adminNotifications"
      ? filteredNotifications.length
      : filteredUsers.length) / itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Get alert icon and colors
  const getAlertIcon = (alertType) => {
    const iconMap = {
      "Low Balance": <Battery className="h-5 w-5" />,
      "Balance Expired": <AlertTriangle className="h-5 w-5" />,
      "Recharge Successful": <CreditCard className="h-5 w-5" />,
      "Recharge Failed": <AlertCircle className="h-5 w-5" />,
      "High Load Usage": <Zap className="h-5 w-5" />,
      "Spike in Usage": <TrendingUp className="h-5 w-5" />,
      "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
      "No Usage Detected": <Activity className="h-5 w-5" />,
      "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
      "Reverse Polarity": <Shield className="h-5 w-5" />,
      "Magnetic Interference": <Magnet className="h-5 w-5" />,
      "Current Imbalance": <Zap className="h-5 w-5" />,
      "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
      "Meter Offline": <WifiOff className="h-5 w-5" />,
      "Reminder to Recharge": <Bell className="h-5 w-5" />,
      "Festival Offer": <Gift className="h-5 w-5" />,
      "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
      "System Alert": <Activity className="h-5 w-5" />,
      "Security Alert": <Shield className="h-5 w-5" />,
      "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
    };
    return iconMap[alertType] || <Bell className="h-5 w-5" />;
  };

  const getAlertColors = (alertType) => {
    const colorMap = {
      "Low Balance": {
        bg: "bg-orange-50",
        icon: "text-orange-600",
        border: "border-orange-200",
      },
      "Balance Expired": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "Recharge Successful": {
        bg: "bg-green-50",
        icon: "text-green-600",
        border: "border-green-200",
      },
      "Recharge Failed": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "High Load Usage": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "Spike in Usage": {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        border: "border-yellow-200",
      },
    };
    return (
      colorMap[alertType] || {
        bg: "bg-gray-50",
        icon: "text-gray-600",
        border: "border-gray-200",
      }
    );
  };

  console.log("===---userNotifications?.[0]?.status======",filteredNotifications?.[0]?.status,filteredNotifications,selectedUser)

  // Determine if we should show the global notification toggle
  const showGlobalToggle = !(isAdmin && !selectedUser && activeTab === "users");

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search */}
//         {showGlobalToggle && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Notification Status
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {userNotifications[0]?.status === "enabled"
//                       ? "All notifications are currently enabled"
//                       : "Notifications are currently disabled"}
//                   </p>
//                 </div>
              
//                 <div className="relative w-full sm:w-64">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* <button
//               onClick={() =>
//                 handleToggleGlobalNotificationStatus(
//                   userNotifications[0]?.status === "enabled"
//                     ? "disabled"
//                     : "enabled"
//                 )
//               }
//               className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//                 userNotifications[0]?.status === "enabled"
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//             >
//               {userNotifications[0]?.status === "enabled"
//                 ? "Disable Notification"
//                 : "Enable Notification"}
//             </button> */}


//            <button
//   onClick={() => {
//         // const currentStatus = user.status
//     const currentStatus = userNotifications?.[0]?.status;
//     handleToggleGlobalNotificationStatus(
//       currentStatus === "enabled" ? "disabled" : "enabled"
//     );
//   }}
//   className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//     userNotifications?.[0]?.status === "enabled"
//       ? "bg-red-600 hover:bg-red-700 text-white"
//       : "bg-green-600 hover:bg-green-700 text-white"
//   }`}
//   disabled={!userNotifications?.length}
// >
//   {userNotifications?.[0]?.status === "enabled"
//     ? "Disable Notification"
//     : "Enable Notification"}
// </button>


//           </div>
//         )}

//         {/* Main Content */}
//         {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full h-full"> */}
//         <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6 ">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Left side - Title and Search (for admin) */}
//               <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   {isUser
//                     ? "Your Notifications"
//                     : selectedUser
//                     ? `Notifications for ${usersList.find(u => u.userId === selectedUser)?.userName || selectedUser}`
//                     : "Notification Management"}
//                 </h2>

//                 {/* Search bar - only show for admin views */}
//                 {(isAdmin && !selectedUser && activeTab!=="adminNotifications") && (
//                   <div className="relative w-full sm:w-64">
//                     <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search Users..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Right side - Admin tabs or back button */}
//               {selectedUser ? (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               ) : isAdmin && !selectedUser ? (
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setActiveTab("users")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "users"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Users
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("adminNotifications")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "adminNotifications"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Admin Notifications
//                   </button>
//                 </div>
//               ) : null}
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* User Notifications View (for both regular users and admin viewing a specific user) */}
//                 {(isUser || selectedUser) && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "You're all caught up!"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Admin Notifications View */}
//                 {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span className="text-sm text-gray-600">
//                                         User: {notification.userName || "Unknown"}
//                                       </span>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No admin notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No admin notifications available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Users List View (Admin only) */}
//                 {isAdmin && !selectedUser && activeTab === "users" && (
//                   <>
//                     {filteredUsers.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((user) => (
//                           <div
//                             key={user._id}
//                             className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                             onClick={() => handleUserSelection(user.userId)}
//                           >
//                             <div className="flex flex-col">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="p-2 rounded-lg bg-gray-100">
//                                     <User className="h-5 w-5 text-gray-600" />
//                                   </div>
//                                   <div>
//                                     <h3 className="font-semibold text-gray-900">
//                                       {user.userName}
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                       ID: {user.userId}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleToggleUserStatus(user.userId, user.status);
//                                     }}
//                                     className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                       user.status === "enabled"
//                                         ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                         : "bg-green-100 hover:bg-green-200 text-green-600"
//                                     }`}
//                                   >
//                                     {user.status === "enabled"
//                                       ? "Disable"
//                                       : "Enable"}
//                                   </button>
//                                   <ChevronRight className="h-5 w-5 text-gray-400" />
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
//                                 <div>
//                                   <p className="text-gray-500">Meter ID</p>
//                                   <p className="font-medium">{user.meterId}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Last Notification</p>
//                                   <p className="font-medium">
//                                     {user.lastNotificationDate
//                                       ? new Date(user.lastNotificationDate).toLocaleDateString()
//                                       : "Never"}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-gray-500">Notification Count</p>
//                                   <p className="font-medium">{user.notificationCount}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No users found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No users available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {filteredNotifications.length > itemsPerPage && (
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     filteredNotifications.length
//                   )}{" "}
//                   of {filteredNotifications.length} items
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );


return (
  <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
    <div className="max-w-7xl mx-auto">
      {/* Global Status Toggle with Search */}
      {showGlobalToggle && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Notification Status</h3>
                <p className="text-sm text-gray-600">
                  {userNotifications[0]?.status === "enabled"
                    ? "All notifications are currently enabled"
                    : "Notifications are currently disabled"}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const currentStatus = userNotifications?.[0]?.status;
              handleToggleGlobalNotificationStatus(
                currentStatus === "enabled" ? "disabled" : "enabled"
              );
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
              userNotifications?.[0]?.status === "enabled"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            disabled={!userNotifications?.length}
          >
            {userNotifications?.[0]?.status === "enabled"
              ? "Disable Notification"
              : "Enable Notification"}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            {/* Left side - Title and Search (for admin) */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {isUser
                  ? "Your Notifications"
                  : selectedUser
                  ? `Notifications for ${
                      usersList.find((u) => u.userId === selectedUser)?.userName ||
                      selectedUser
                    }`
                  : "Notification Management"}
              </h2>

              {/* Search bar - only show for admin views */}
              {isAdmin && !selectedUser && activeTab !== "adminNotifications" && (
                <div className="relative w-full sm:w-64">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}
            </div>

            {/* Right side - Admin tabs or back button */}
            {selectedUser ? (
              <button
                onClick={handleBackToList}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to users
              </button>
            ) : isAdmin && !selectedUser ? (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "users"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab("adminNotifications")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "adminNotifications"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Admin Notifications
                </button>
              </div>
            ) : null}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* User Notifications View */}
              {(isUser || selectedUser) && (
                <>
                  {filteredNotifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentItems.map((notification) => {
                        const colors = getAlertColors(notification.alertType);
                        return (
                          <div
                            key={notification._id}
                            className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                  <span className={colors.icon}>
                                    {getAlertIcon(notification.alertType)}
                                  </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {notification.alertType}
                                    </h3>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        notification.mode.includes("Text")
                                          ? "text-blue-600 bg-blue-100"
                                          : "text-purple-600 bg-purple-100"
                                      }`}
                                    >
                                      {notification.mode}
                                    </span>
                                  </div>

                                  <p className="text-gray-700 mb-3">
                                    {notification.message}
                                  </p>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                                    <div>
                                      <span className="font-medium text-gray-600">
                                        Value:
                                      </span>
                                      <div className="text-gray-900 font-semibold">
                                        {notification.value}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-600">
                                        Time:
                                      </span>
                                      <div className="text-gray-900">
                                        {new Date(notification.time).toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No notifications found
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "You're all caught up!"}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Admin Notifications View */}
              {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
                <>
                  {filteredNotifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentItems.map((notification) => {
                        const colors = getAlertColors(notification.alertType);
                        return (
                          <div
                            key={notification._id}
                            className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                  <span className={colors.icon}>
                                    {getAlertIcon(notification.alertType)}
                                  </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {notification.alertType}
                                    </h3>
                                    <span className="text-sm text-gray-600">
                                      User: {notification.userName || "Unknown"}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        notification.mode.includes("Text")
                                          ? "text-blue-600 bg-blue-100"
                                          : "text-purple-600 bg-purple-100"
                                      }`}
                                    >
                                      {notification.mode}
                                    </span>
                                  </div>

                                  <p className="text-gray-700 mb-3">
                                    {notification.message}
                                  </p>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                                    <div>
                                      <span className="font-medium text-gray-600">
                                        Value:
                                      </span>
                                      <div className="text-gray-900 font-semibold">
                                        {notification.value}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-600">
                                        Time:
                                      </span>
                                      <div className="text-gray-900">
                                        {new Date(notification.time).toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No admin notifications found
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "No admin notifications available"}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Users List View - Full Width */}
              {isAdmin && !selectedUser && activeTab === "users" && (
                <>
                  {filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {currentItems.map((user) => (
                        <div
                          key={user._id}
                          className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleUserSelection(user.userId)}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-gray-100">
                                  <User className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {user.userName}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    ID: {user.userId}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleUserStatus(user.userId, user.status);
                                  }}
                                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                                    user.status === "enabled"
                                      ? "bg-red-100 hover:bg-red-200 text-red-600"
                                      : "bg-green-100 hover:bg-green-200 text-green-600"
                                  }`}
                                >
                                  {user.status === "enabled"
                                    ? "Disable"
                                    : "Enable"}
                                </button>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Meter ID</p>
                                <p className="font-medium">{user.meterId}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Last Notification</p>
                                <p className="font-medium">
                                  {user.lastNotificationDate
                                    ? new Date(
                                        user.lastNotificationDate
                                      ).toLocaleDateString()
                                    : "Never"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">
                                  Notification Count
                                </p>
                                <p className="font-medium">
                                  {user.notificationCount}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No users found
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "No users available"}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Pagination */}
          {/* {filteredNotifications.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredNotifications.length
                )}{" "}
                of {filteredNotifications.length} items
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={() => goToPage(1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border"
                  }`}
                >
                  1
                </button>

                {totalPages >= 2 && (
                  <button
                    onClick={() => goToPage(2)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 2
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border"
                    }`}
                  >
                    2
                  </button>
                )}

                {totalPages > 4 && <span className="px-3 py-1">...</span>}

                {totalPages >= 4 && (
                  <button
                    onClick={() => goToPage(totalPages - 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages - 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border"
                    }`}
                  >
                    {totalPages - 1}
                  </button>
                )}

                {totalPages >= 3 && (
                  <button
                    onClick={() => goToPage(totalPages)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )} */}
          {/* Pagination */}
{((isUser || selectedUser || activeTab === "adminNotifications") && 
  filteredNotifications.length > itemsPerPage) || 
 (isAdmin && !selectedUser && activeTab === "users" && 
  filteredUsers.length > itemsPerPage) ? (
  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
    <div className="text-sm text-gray-600">
      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
      {Math.min(
        currentPage * itemsPerPage,
        isAdmin && !selectedUser && activeTab === "users" 
          ? filteredUsers.length 
          : filteredNotifications.length
      )}{" "}
      of{" "}
      {isAdmin && !selectedUser && activeTab === "users"
        ? filteredUsers.length
        : filteredNotifications.length}{" "}
      {isAdmin && !selectedUser && activeTab === "users" 
        ? "users" 
        : "items"}
    </div>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Previous
      </button>

      {/* Always show first page */}
      <button
        onClick={() => goToPage(1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50 border"
        }`}
      >
        1
      </button>

      {/* Always show second page if exists */}
      {totalPages >= 2 && (
        <button
          onClick={() => goToPage(2)}
          className={`px-3 py-1 rounded-md ${
            currentPage === 2
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border"
          }`}
        >
          2
        </button>
      )}

      {/* Show ellipsis if there are pages between 2 and n-1 */}
      {totalPages > 4 && currentPage < totalPages - 1 && currentPage > 2 && (
        <span className="px-3 py-1">...</span>
      )}

      {/* Show current page if it's not 1 or 2 or last/last-1 */}
      {totalPages > 4 && currentPage > 2 && currentPage < totalPages - 1 && (
        <button
          onClick={() => goToPage(currentPage)}
          className="px-3 py-1 rounded-md bg-blue-600 text-white"
        >
          {currentPage}
        </button>
      )}

      {/* Show second last page if it's not page 2 */}
      {totalPages >= 4 && (
        <button
          onClick={() => goToPage(totalPages - 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages - 1
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border"
          }`}
        >
          {totalPages - 1}
        </button>
      )}

      {/* Show last page if it's not page 1 or 2 */}
      {totalPages >= 3 && (
        <button
          onClick={() => goToPage(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border"
          }`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  </div>
) : null}
        </div>
      </div>
    </div>
  </div>
);



};

export default AlertAndNotification;














// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   Clock,
//   User,
//   Hash,
//   Calendar,
//   ToggleLeft,
//   ToggleRight,
//   Filter,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   Wifi,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   ChevronLeft,
//   User2,
//   UserCircle2,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import {
//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser,
//   updateUserStatus
// } from "../redux/slice/notificationSlice";
// import { 
//   fetchAdminNotifications,
//   fetchUserNotifications,
//   toggleNotificationStatus,
// } from "../redux/thunks/notificationThunks";

// const AlertAndNotification = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   // Auth data
//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//   const isAdmin = userRole === "admin";
//   const isUser = userRole === "user";

//   // Notification data
//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   // For admin view
//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Initial setup
//   useEffect(() => {
//     dispatch(setHeaderTitle("Notifications"));
//     dispatch(setBreadcrumbs([
//       { label: "Notifications", link: "/alertandnotification" },
//     ]));
//   }, [dispatch]);

//   // Fetch notifications based on role and view
//   useEffect(() => {
//     if (isAdmin && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (isAdmin && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (isUser) {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//     const targetUserId = selectedUser || userId;
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId: targetUserId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId: targetUserId, 
//         status: newStatus === "enabled" ? "disabled" : "enabled" 
//       }));
//     }
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
//     try {
//       // Optimistically update the state
//       dispatch(updateUserStatus({ userId, status: newStatus }));
      
//       // Then make the API call
//       await dispatch(toggleNotificationStatus({ 
//         userId, 
//         status: newStatus 
//       })).unwrap();
//     } catch (error) {
//       toast.error("Failed to update user notification status");
//       // Revert the optimistic update if the API call fails
//       dispatch(updateUserStatus({ 
//         userId, 
//         status: currentStatus 
//       }));
//     }
//   };

//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//   };

//   // Filter notifications based on search term
//   const filteredNotifications = (isUser || selectedUser ? userNotifications : adminNotifications)?.filter((notification) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       notification.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (isAdmin && !selectedUser && (
//         notification.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         notification.meterId?.toLowerCase().includes(searchTerm.toLowerCase())
//       ));
//     return matchesSearch;
//   }) || [];

//   // Filter users list for admin view
//   const filteredUsers = usersList?.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   // Get current items to display
//   const currentItems = isUser || selectedUser
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : activeTab === "adminNotifications"
//     ? filteredNotifications.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : filteredUsers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       );

//   const totalPages = Math.ceil(
//     (isUser || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Get alert icon and colors
//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   // Determine if we should show the global notification toggle
//   const showGlobalToggle = !(isAdmin && !selectedUser && activeTab === "users");

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Global Status Toggle with Search - Only show for non-admin users or when viewing a specific user */}
//         {showGlobalToggle && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     Notification Status
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {userNotifications[0]?.status === "enabled"
//                       ? "All notifications are currently enabled"
//                       : "Notifications are currently disabled"}
//                   </p>
//                 </div>
              
//                 {/* Search bar - only show for non-admin users */}
//                 {!isAdmin && (
//                   <div className="relative w-full sm:w-64">
//                     <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search notifications..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 const currentStatus = userNotifications?.[0]?.status;
//                 handleToggleGlobalNotificationStatus(
//                   currentStatus === "enabled" ? "disabled" : "enabled"
//                 );
//               }}
//               className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
//                 userNotifications?.[0]?.status === "enabled"
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//               disabled={!userNotifications?.length}
//             >
//               {userNotifications?.[0]?.status === "enabled"
//                 ? "Disable Notification"
//                 : "Enable Notification"}
//             </button>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//               {/* Left side - Title */}
//               <div className="flex-1">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   {isUser
//                     ? "Your Notifications"
//                     : selectedUser
//                     ? `Notifications for ${usersList.find(u => u.userId === selectedUser)?.userName || selectedUser}`
//                     : "Notification Management"}
//                 </h2>
//               </div>

//               {/* Right side - Admin tabs or back button */}
//               {selectedUser ? (
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Back to users
//                 </button>
//               ) : isAdmin && !selectedUser ? (
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setActiveTab("users")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "users"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Users
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("adminNotifications")}
//                     className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
//                       activeTab === "adminNotifications"
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     Admin Notifications
//                   </button>
//                 </div>
//               ) : null}
//             </div>

//             {/* Search bar - only show for admin views (moved here from the header section) */}
//             {(isAdmin && !selectedUser) && (
//               <div className="relative w-full sm:w-64 mb-6">
//                 <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search notifications..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
//             )}

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* User Notifications View (for both regular users and admin viewing a specific user) */}
//                 {(isUser || selectedUser) && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "You're all caught up!"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Admin Notifications View */}
//                 {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md`}
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div className={`p-2 rounded-lg ${colors.bg}`}>
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span className="text-sm text-gray-600">
//                                         User: {notification.userName || "Unknown"}
//                                       </span>
//                                       <span
//                                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                       >
//                                         {notification.mode}
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No admin notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No admin notifications available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Users List View (Admin only) */}
//                 {isAdmin && !selectedUser && activeTab === "users" && (
//                   <div className="bg-white rounded-lg border border-gray-200">
//                     {filteredUsers.length > 0 ? (
//                       <div className="divide-y divide-gray-200">
//                         {currentItems.map((user) => (
//                           <div
//                             key={user._id}
//                             className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
//                             onClick={() => handleUserSelection(user.userId)}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center space-x-4">
//                                 <div className="p-2 rounded-lg bg-gray-100">
//                                   <User className="h-5 w-5 text-gray-600" />
//                                 </div>
//                                 <div>
//                                   <h3 className="font-semibold text-gray-900">
//                                     {user.userName}
//                                   </h3>
//                                   <p className="text-sm text-gray-600">
//                                     ID: {user.userId} | Meter: {user.meterId}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center space-x-4">
//                                 <div className="text-sm text-gray-600">
//                                   Last activity:{" "}
//                                   {user.lastNotificationDate
//                                     ? new Date(user.lastNotificationDate).toLocaleDateString()
//                                     : "Never"}
//                                 </div>
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleToggleUserStatus(user.userId, user.status);
//                                   }}
//                                   className={`px-3 py-1 rounded-md text-xs font-medium ${
//                                     user.status === "enabled"
//                                       ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                       : "bg-green-100 hover:bg-green-200 text-green-600"
//                                   }`}
//                                 >
//                                   {user.status === "enabled"
//                                     ? "Disable"
//                                     : "Enable"}
//                                 </button>
//                                 <ChevronRight className="h-5 w-5 text-gray-400" />
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No users found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No users available"}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Pagination */}
//             {filteredNotifications.length > itemsPerPage && (
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     filteredNotifications.length
//                   )}{" "}
//                   of {filteredNotifications.length} items
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === 1
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   {/* Always show first page */}
//                   <button
//                     onClick={() => goToPage(1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50 border"
//                     }`}
//                   >
//                     1
//                   </button>

//                   {/* Always show second page */}
//                   {totalPages >= 2 && (
//                     <button
//                       onClick={() => goToPage(2)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 2
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       2
//                     </button>
//                   )}

//                   {/* Show ellipsis if there are pages between 2 and n-1 */}
//                   {totalPages > 4 && <span className="px-3 py-1">...</span>}

//                   {/* Show second last page if it's not page 2 */}
//                   {totalPages >= 4 && (
//                     <button
//                       onClick={() => goToPage(totalPages - 1)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages - 1
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages - 1}
//                     </button>
//                   )}

//                   {/* Show last page if it's not page 1 or 2 */}
//                   {totalPages >= 3 && (
//                     <button
//                       onClick={() => goToPage(totalPages)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border"
//                       }`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-md border ${
//                       currentPage === totalPages
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;