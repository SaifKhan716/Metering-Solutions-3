// import React from "react";
// import { HashRouter, Route, Routes } from "react-router-dom";
// import DashboardLayout from "./layout/DashboardLayout";
// import AdminDashboard from "./pages/AdminDashboard";
// import MeterManagement from "./pages/MeterManagement";
// import UserManagement from "./pages/UserManagement";
// import AlertAndNotification from "./pages/AlertAndNotification";
// import Archive from "./pages/Archive";
// import BillingAndPayment from "./pages/BillingAndPayment";
// import Chat from "./pages/Chat";
// import EnergyConsumption from "./pages/EnergyConsumption";
// import Invoice from "./pages/Invoice";
// import Onboarding from "./pages/Onboarding";
// import Roles from "./pages/Roles";
// import SupportAndLogs from "./pages/SupportAndLogs";
// import RecentAndHistoricalData from "./components/energyConsumption/RecentAndHistoricalData";
// import UserDashboard from "./pages/UserDashboard";
// import PrivateRoute from "./service/ProtectedRoute";
// import UsageHistory from './pages/UsageHistory'
// import AccountSettings from "./pages/AccountSetting";
// import SignUpForm from './components/user/SignUpForm'
// import SignIn from './components/user/LoginForm';

// const App = () => {

//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/customer-register" element={<SignUpForm />} />

//         <Route element={<PrivateRoute allowedRoles={['admin']} />}>
//           <Route path="/admin" element={<DashboardLayout />}>
//             <Route path='/admin-dashbaord' element={<AdminDashboard />} />
//             <Route path="user-management/:id"  element={<UserManagement />} />
//             <Route path="meter-management/:id" element={<MeterManagement />} />
//             <Route path="roles/:id" element={<Roles />} />
//             <Route path="supportandlogs/:id" element={<SupportAndLogs />} />
//             <Route path="onboarding/:id" element={<Onboarding />} />
//           </Route>
//         </Route>

//         <Route element={<PrivateRoute allowedRoles={['user']} />}>
//           <Route path='/user' element={<DashboardLayout />} >
//             <Route path='dashboard/:id' element={<UserDashboard />} />
//             <Route path='usage-history/:id' element={<UsageHistory />} />
//             <Route path='account-setting/:id' element={<AccountSettings />} />
//             <Route path="alert-notification/:id"element={<AlertAndNotification />}/>
//             <Route path="archive/:id" element={<Archive />} />
//             <Route path="billingandpayment/:id" element={<BillingAndPayment />} />
//             <Route path="chat/:id" element={<Chat />} />

//             <Route path="energyConsumption/:id">
//               <Route path="" index element={<EnergyConsumption />} />
//               <Route path="recenthistoricaldata" element={<RecentAndHistoricalData />} />
//             </Route>

//             <Route path="invoice/:id" element={<Invoice />} />
//           </Route>
//         </Route>
//       </Routes>
//     </HashRouter>
//   );
// };

// export default App;

import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import PrivateRoute from "./service/ProtectedRoute";
import NotFound404 from "./pages/NotFound404";
import ProfileSection from "./pages/ProfileSection";
import SuperAdminRechargeHistory from "./components/superAdmin/SuperAdminRechargeHistory";
import { ToastContainer } from "react-toastify";

// Lazy-loaded components
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const MeterManagement = lazy(() => import("./pages/MeterManagement"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const AlertAndNotification = lazy(() => import("./pages/AlertAndNotification"));
const Archive = lazy(() => import("./pages/Archive"));
const BillingAndPayment = lazy(() => import("./pages/BillingAndPayment"));
const Chat = lazy(() => import("./pages/Chat"));
const EnergyConsumption = lazy(() => import("./pages/EnergyConsumption"));
const Invoice = lazy(() => import("./pages/Invoice"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Roles = lazy(() => import("./pages/Roles"));
const SupportAndLogs = lazy(() => import("./pages/SupportAndLogs"));
const RecentAndHistoricalData = lazy(() =>
  import("./components/energyConsumption/RecentAndHistoricalData")
);
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AccountSettings = lazy(() => import("./pages/AccountSetting"));
const SignUpForm = lazy(() => import("./components/user/SignUpForm"));
const SignIn = lazy(() => import("./components/user/LoginForm"));
const AdminMeterList = lazy(() => import("./pages/AdminMeterList"));
const AdminUserList = lazy(() => import("./pages/AdminUserList"));
const Faulty = lazy(() => import("./pages/Faulty"));
const Offline = lazy(() => import("./pages/Offline"));
const SuperAdminPanel = lazy(() => import("./pages/SuperAdminPanel"));
const DailyMeterDataUsageHistory = lazy(() =>
  import("./components/superAdmin/DailyMeterDataUsageHistory")
);
const UsageHistoryDashboard = lazy(() => import("./pages/UsageHistory"));
const DueBalanceUser = lazy(() =>
  import("./components/adminDashboard/DueBalanceUser")
);

// You can replace this with a Spinner or Skeleton
const Loader = () => <div>Loading...</div>;

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/customer-register" element={<SignUpForm />} />
          <Route path="*" element={<NotFound404 />} />
          <Route element={<PrivateRoute allowedRoles={["superAdmin"]} />}>
            <Route path="/superAdmin" element={<DashboardLayout />}>
              <Route path="profile" element={<ProfileSection />} />
              <Route path="dashboard/:id" element={<SuperAdminPanel />} />
              <Route
                path="meter-usage/:meterId"
                element={<DailyMeterDataUsageHistory />}
              />

              {/* <Route path="/admin/rechargehistory/:meterid" element = {<AdminRechargeHistory/>}/>  */}
              <Route
                path="recharge-history/:meterId"
                element={<SuperAdminRechargeHistory />}
              />
            </Route>
          </Route>
          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="profile" element={<ProfileSection />} />
              <Route path="dashboard/:id" element={<AdminDashboard />} />
              <Route path="meters-list" element={<AdminMeterList />} />
              <Route path="user-list" element={<AdminUserList />} />
              <Route path="offline-meters" element={<Offline />} />
              <Route path="faulty-meters" element={<Faulty />} />
              {/* <Route path='due-users' element={<AdminMeterList/>} /> */}
              <Route
                path="dashboard/duebalanceuser/:adminId"
                element={<DueBalanceUser />}
              />
              <Route
                path="alert&notification"
                element={<AlertAndNotification />}
              />
              <Route path="dashboard/:id" element={<AdminDashboard />} />
              <Route path="user-management/:id" element={<UserManagement />} />
              <Route
                path="meter-management/:id"
                element={<MeterManagement />}
              />
              <Route path="roles/:id" element={<Roles />} />
              <Route path="supportandlogs/:id" element={<SupportAndLogs />} />
              <Route path="onboarding/:id" element={<Onboarding />} />
              <Route path="invoice" element={<Invoice />} />
            </Route>
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user" element={<DashboardLayout />}>
              <Route path="profile" element={<ProfileSection />} />
              <Route path="dashboard/:id" element={<UserDashboard />} />
              <Route
                path="usage-history/:id"
                element={<UsageHistoryDashboard />}
              />
              <Route path="account-setting/:id" element={<AccountSettings />} />
              <Route
                path="alert-notification/:id"
                element={<AlertAndNotification />}
              />
              {/* <Route path="alert-notification/:id" element={<AlertAndNotification />} /> */}
              <Route path="archive/:id" element={<Archive />} />
              <Route
                path="billingandpayment/:id"
                element={<BillingAndPayment />}
              />
              <Route path="chat/:id" element={<Chat />} />
              <Route path="invoice/:id" element={<Invoice />} />
              <Route path="supportandlogs/:id" element={<SupportAndLogs />} />

              <Route path="energyConsumption/:id">
                <Route index element={<EnergyConsumption />} />
                <Route
                  path="recenthistoricaldata"
                  element={<RecentAndHistoricalData />}
                />
              </Route>
            </Route>
          </Route>

          {/* Future SuperAdmin Route Structure */}
          {/* 
          <Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
            <Route path="/superadmin" element={<DashboardLayout />}>
              <Route path="..." element={<SuperAdminDashboard />} />
            </Route>
          </Route> 
          */}
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </HashRouter>
  );
};

export default App;
