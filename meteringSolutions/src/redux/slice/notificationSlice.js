// import { createSlice, createSelector } from "@reduxjs/toolkit";
// import {
//   fetchAdminNotifications,
//   toggleNotificationStatus,
//   fetchUserNotifications,
// } from "../thunks/notificationThunks";

// const initialState = {
//   userNotifications: [],
//   adminNotifications: [],
//   usersList: [],
//   loading: false,
//   error: null,
//   status: "idle",
// };

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {
//     clearNotifications: (state) => {
//       state.userNotifications = [];
//       state.adminNotifications = [];
//       state.usersList = [];
//       state.error = null;
//     },
//     setSelectedUser: (state, action) => {
//       state.selectedUser = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch User Notifications
//       .addCase(fetchUserNotifications.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.status = "loading";
//       })
//       .addCase(fetchUserNotifications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = "succeeded";
//         const response = action.payload;
//         if (response.success && response.data) {
//           state.userNotifications = response.data.userNotification || [];
//         } else {
//           state.userNotifications = [];
//           state.error = response.message || "No notifications found";
//         }
//       })
//       .addCase(fetchUserNotifications.rejected, (state, action) => {
//         state.loading = false;
//         state.status = "failed";
//         state.error =
//           action.payload?.message || "Failed to fetch user notifications";
//       })

//       // Fetch Admin Notifications
//       .addCase(fetchAdminNotifications.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.status = "loading";
//       })
//       .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = "succeeded";
//         const response = action.payload;
//         if (response.success && response.data) {
//           // Format users list
//           const formattedUsers = response.data.map((notification) => ({
//             _id: notification._id,
//             userId: notification.userId?._id || "N/A",
//             userName: notification.userId?.name || "Unknown User",
//             meterId: notification.meterId?.meterId || "N/A",
//             meterName: notification.meterId?.name || "Unknown Meter",
//             lastNotificationDate: notification.lastNotificationDate,
//             status: notification.status,
//             notificationCount: notification.userNotification?.length || 0,
//           }));

//           // Flatten admin notifications
//           const allAdminNotifications = response.data.flatMap((item) =>
//             item.userNotification.map((notif) => ({
//               ...notif,
//               userId: item.userId?._id,
//               userName: item.userId?.name,
//               meterId: item.meterId?.meterId,
//               meterName: item.meterId?.name,
//             }))
//           );

//           state.usersList = formattedUsers;
//           state.adminNotifications = allAdminNotifications;
//         } else {
//           state.usersList = [];
//           state.adminNotifications = [];
//           state.error = response.message || "No admin notifications found";
//         }
//       })
//       .addCase(fetchAdminNotifications.rejected, (state, action) => {
//         state.loading = false;
//         state.status = "failed";
//         state.error =
//           action.payload?.message || "Failed to fetch admin notifications";
//       })

//       // Toggle Notification Status
//       .addCase(toggleNotificationStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(toggleNotificationStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         const { data } = action.payload;

//         if (!data) return;

//         // Update the main notification status
//         const updatedStatus = data.status;

//         // Update usersList
//         state.usersList = state.usersList.map((user) => {
//           if (user.userId === data.userId._id) {
//             return { ...user, status: updatedStatus };
//           }
//           return user;
//         });

//         // Update userNotifications if viewing that user
//         if (state.selectedUser === data.userId._id) {
//           state.userNotifications = state.userNotifications.map((notif) => ({
//             ...notif,
//             status: updatedStatus,
//           }));
//         }

//         // Update adminNotifications
//         state.adminNotifications = state.adminNotifications.map((notif) => {
//           if (notif.userId === data.userId._id) {
//             return { ...notif, status: updatedStatus };
//           }
//           return notif;
//         });
//       })
//       .addCase(toggleNotificationStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload?.message || "Failed to toggle notification status";
//       });
//   },
// });

// // Selectors
// export const selectUserNotifications = (state) =>
//   state.notifications.userNotifications;
// export const selectAdminNotifications = (state) =>
//   state.notifications.adminNotifications;
// export const selectUsersList = (state) => state.notifications.usersList;
// export const selectNotificationsLoading = (state) =>
//   state.notifications.loading;
// export const selectNotificationsError = (state) => state.notifications.error;
// export const selectNotificationStatus = (state) => state.notifications.status;
// export const selectSelectedUser = (state) => state.notifications.selectedUser;

// export const { clearNotifications, setSelectedUser } =
//   notificationSlice.actions;

// export default notificationSlice.reducer;



















import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import {
  fetchAdminNotifications,
  toggleNotificationStatus,
  fetchUserNotifications,
} from "../thunks/notificationThunks";

const initialState = {
  userNotifications: [],
  adminNotifications: [],
  usersList: [],
  loading: false,
  error: null,
  status: 'idle',
  selectedUser: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.userNotifications = [];
      state.adminNotifications = [];
      state.usersList = [];
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      
      // Optimistically update usersList
      state.usersList = state.usersList.map(user => 
        user.userId === userId ? { ...user, status } : user
      );
      
      // Update adminNotifications if needed
      state.adminNotifications = state.adminNotifications.map(notif => 
        notif.userId === userId ? { ...notif, status } : notif
      );
      
      // Update userNotifications if viewing that user
      if (state.selectedUser === userId) {
        state.userNotifications = state.userNotifications.map(notif => ({
          ...notif,
          status
        }));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Notifications
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
     const response = action.payload;
if (response.success && response.data) {
//   console.log("=====5555====", response.data.userNotification, response.data);
// console.log("===77=",response.data)
  state.userNotifications = (response.data.userNotification || []).map(n => ({
    alertType: n.alertType,
    message: n.message,
    mode: n.mode,
    time: n.time,
    value: n.value,
    _id: n._id,
    status: response.data.status
  }));
}

         else {
          state.userNotifications = [];
          state.error = response.message || 'No notifications found';
        }
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch user notifications';
      })
      
      // Fetch Admin Notifications
      .addCase(fetchAdminNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const response = action.payload;
        if (response.success && response.data) {
          // Format users list
          console.log("======response===",response)
          const formattedUsers = response.data.map(notification => ({
            _id: notification._id,
            userId: notification.userId?._id || 'N/A',
            userName: notification.userId?.name || 'Unknown User',
            meterId: notification.meterId?.meterId || 'N/A',
            meterName: notification.meterId?.name || 'Unknown Meter',
            lastNotificationDate: notification.lastNotificationDate,
            status: notification.status,
            notificationCount: notification.userNotification?.length || 0
          }));
          
          // Flatten admin notifications
          const allAdminNotifications = response.data.flatMap(item => 
            item.userNotification.map(notif => ({
              ...notif,
              userId: item.userId?._id,
              userName: item.userId?.name,
              meterId: item.meterId?.meterId,
              meterName: item.meterId?.name,
              status:item.status
            }))
          );
          
          state.usersList = formattedUsers;
          state.adminNotifications = allAdminNotifications;
        } else {
          state.usersList = [];
          state.adminNotifications = [];
          state.error = response.message || 'No admin notifications found';
        }
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch admin notifications';
      })
      
      // Toggle Notification Status
      .addCase(toggleNotificationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleNotificationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { data } = action.payload;
        if (!data) return;
        
        // The reducer will handle the optimistic update
      })
      .addCase(toggleNotificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to toggle notification status';
      });
  }
});

// Selectors
export const selectUserNotifications = (state) => state.notifications.userNotifications;
export const selectAdminNotifications = (state) => state.notifications.adminNotifications;
export const selectUsersList = (state) => state.notifications.usersList;
export const selectNotificationsLoading = (state) => state.notifications.loading;
export const selectNotificationsError = (state) => state.notifications.error;
export const selectNotificationStatus = (state) => state.notifications.status;
export const selectSelectedUser = (state) => state.notifications.selectedUser;

export const { clearNotifications, setSelectedUser, updateUserStatus } = notificationSlice.actions;

export default notificationSlice.reducer;