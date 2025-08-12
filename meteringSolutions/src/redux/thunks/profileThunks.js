
// // Profile Redux Slice (features/profileSlice.js)
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk for fetching user profile
// // export const fetchUserProfile = createAsyncThunk(
// //   'profile/fetchUserProfile',
// //   async (userId, { rejectWithValue }) => {
// //     try {
// //       const response = await fetch(`/api/profile/${userId}`, {
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to fetch profile');
// //       }

// //       const data = await response.json();
// //       return data;
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (thunkAPI) => {
//   try {
//     const token = localStorage.getItem('authToken');
//     const res = await fetch('/api/me', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) throw new Error('Failed to fetch user profile');
//     return await res.json();
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // Async thunk for updating profile
// export const updateUserProfile = createAsyncThunk(
//   'profile/updateUserProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/profile', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(profileData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for uploading avatar
// export const uploadAvatar = createAsyncThunk(
//   'profile/uploadAvatar',
//   async (file, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('avatar', file);

//       const response = await fetch('/api/profile/avatar', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload avatar');
//       }

//       const data = await response.json();
//       return data.avatarUrl;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// profileThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/apiService';

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (_, thunkAPI) => {
        try {
            console.log('checking if thunk is working or not');
            const res = await userApi.profile();
            console.log('data', res);
            const data = await res.data;
            console.log(data);
            const [firstName = '', lastName = ''] = data.name?.split(' ') ?? [];

            return {
                id: data._id,
                firstName,
                lastName,
                email: data.email,
                phone: data.phone || '',
                avatar: data.avatar || '',
                bio: data.bio || '',
                dateOfBirth: data.dateOfBirth || '',
                website: data.website || '',
                socialLinks: {
                    twitter: data.socialLinks?.twitter || '',
                    linkedin: data.socialLinks?.linkedin || '',
                    github: data.socialLinks?.github || '',
                },
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const {
                firstName,
                lastName,
                email,
                phone,
                bio,
                dateOfBirth,
                website,
                socialLinks,
            } = profileData;

            const payload = {
                name: `${firstName} ${lastName}`.trim(),
                email,
                phone,
                bio,
                dateOfBirth,
                website,
                socialLinks,
            };

            const response = await userApi.updateProfile(payload);

            

            const updated = await response.data;
            const [updatedFirstName = '', updatedLastName = ''] = updated.name?.split(' ') ?? [];

            return {
                id: updated._id,
                firstName: updatedFirstName,
                lastName: updatedLastName,
                email: updated.email,
                phone: updated.phone || '',
                avatar: updated.avatar || '',
                bio: updated.bio || '',
                dateOfBirth: updated.dateOfBirth || '',
                website: updated.website || '',
                socialLinks: {
                    twitter: updated.socialLinks?.twitter || '',
                    linkedin: updated.socialLinks?.linkedin || '',
                    github: updated.socialLinks?.github || '',
                },
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    'profile/uploadAvatar',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch('/api/profile/avatar', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            return data.avatarUrl;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
