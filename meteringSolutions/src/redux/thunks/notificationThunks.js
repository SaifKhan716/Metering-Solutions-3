import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notificationApi } from '../../api/apiService';

// export const fetchUserNotifications = createAsyncThunk(
//   'notifications/fetchUserNotifications',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await notificationApi.getUserNotifications(userId);

//       console.log("========--fetchUserNotifications----====",response)
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );





// Async thunks
export const fetchUserNotifications = createAsyncThunk(
  'notifications/fetchUserNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getUserNotifications(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAdminNotifications = createAsyncThunk(
  'notifications/fetchAdminNotifications',
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getAdminNotifications(adminId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const toggleNotificationStatus = createAsyncThunk(
  'notifications/toggleStatus',
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await notificationApi.toggleNotificationStatus({ userId, status });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

