// import { createSlice } from '@reduxjs/toolkit';


// // const userSlice = createSlice({
// //   name: 'profile',
// //   initialState: {
// //     profile: null,
// //     status: 'idle',
// //     error: null,
// //   },
// //   reducers: {
    
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchUserProfile.pending, (state) => {
// //         state.status = 'loading';
// //         state.error = null;
// //       })
// //       .addCase(fetchUserProfile.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.profile = action.payload;
// //       })
// //       .addCase(fetchUserProfile.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const selectUserProfile = (state) => state.user.profile;
// // export const selectUserStatus = (state) => state.user.status;
// // export default userSlice.reducer;



// const initialState = {
//   user: {
//     id: null,
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     bio: '',
//     location: '',
//     avatar: '',
//     dateOfBirth: '',
//     website: '',
//     socialLinks: {
//       twitter: '',
//       linkedin: '',
//       github: ''
//     }
//   },
//   loading: false,
//   updating: false,
//   uploadingAvatar: false,
//   error: null,
//   success: null,
//   isEditing: false,
//   editingField: null,
// };

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     toggleEditMode: (state) => {
//       state.isEditing = !state.isEditing;
//       if (!state.isEditing) {
//         state.editingField = null;
//       }
//     },
//     setEditingField: (state, action) => {
//       state.editingField = action.payload;
//     },
//     updateField: (state, action) => {
//       const { field, value } = action.payload;
//       if (field.includes('.')) {
//         const [parent, child] = field.split('.');
//         state.user[parent][child] = value;
//       } else {
//         state.user[field] = value;
//       }
//     },
//     clearMessages: (state) => {
//       state.error = null;
//       state.success = null;
//     },
//     resetProfile: (state) => {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Profile
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = { ...state.user, ...action.payload };
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch profile';
//       })
      
//       // Update Profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.updating = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.updating = false;
//         state.user = { ...state.user, ...action.payload };
//         state.success = 'Profile updated successfully!';
//         state.isEditing = false;
//         state.editingField = null;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.updating = false;
//         state.error = action.payload || 'Failed to update profile';
//       })
      
//       // Upload Avatar
//       .addCase(uploadAvatar.pending, (state) => {
//         state.uploadingAvatar = true;
//         state.error = null;
//       })
//       .addCase(uploadAvatar.fulfilled, (state, action) => {
//         state.uploadingAvatar = false;
//         state.user.avatar = action.payload;
//         state.success = 'Avatar updated successfully!';
//       })
//       .addCase(uploadAvatar.rejected, (state, action) => {
//         state.uploadingAvatar = false;
//         state.error = action.payload || 'Failed to upload avatar';
//       });
//   },
// });

// export const {
//   toggleEditMode,
//   setEditingField,
//   updateField,
//   clearMessages,
//   resetProfile,
// } = profileSlice.actions;

// export const selectUserProfile = (state)=> state.profile.user;

// export default profileSlice.reducer;

// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadAvatar,
} from '../thunks/profileThunks';

const initialState = {
  user: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '', // optional field; not in API now
    avatar: '',
    dateOfBirth: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  },
  loading: false,
  updating: false,
  uploadingAvatar: false,
  error: null,
  success: null,
  isEditing: false,
  editingField: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing;
      if (!state.isEditing) {
        state.editingField = null;
      }
    },
    setEditingField: (state, action) => {
      state.editingField = action.payload;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        state.user[parent][child] = value;
      } else {
        state.user[field] = value;
      }
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.user = action.payload;
        state.success = 'Profile updated successfully!';
        state.isEditing = false;
        state.editingField = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || 'Failed to update profile';
      })

      // Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.uploadingAvatar = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.uploadingAvatar = false;
        state.user.avatar = action.payload;
        state.success = 'Avatar updated successfully!';
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.uploadingAvatar = false;
        state.error = action.payload || 'Failed to upload avatar';
      });
  },
});

export const {
  toggleEditMode,
  setEditingField,
  updateField,
  clearMessages,
  resetProfile,
} = profileSlice.actions;

export const selectUserProfile = (state) => state.profile.user;
export default profileSlice.reducer;

