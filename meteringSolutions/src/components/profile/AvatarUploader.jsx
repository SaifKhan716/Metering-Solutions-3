// components/AvatarUploader.jsx
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar } from '../redux/thunks/profileThunks';
import { Camera } from 'lucide-react';

const AvatarUploader = ({ avatarUrl, editable }) => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.profile.uploadingAvatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
      dispatch(uploadAvatar(file));
    }
  };

  return (
    <div className="relative w-24 h-24 mx-auto">
      <img
        src={avatarUrl || 'https://via.placeholder.com/96x96'}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border"
      />
      {editable && (
        <>
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </>
      )}
    </div>
  );
};

export default AvatarUploader;
