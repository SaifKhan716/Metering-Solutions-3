import React from 'react';

const ProfileField = ({ label, name, value, isEditing, type = 'text', icon: Icon, handleChange }) => (
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    {isEditing ? (
      <input
        name={name}
        value={value || ''}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm"
        type={type}
      />
    ) : (
      <p className="text-gray-800 text-sm mt-1">{value || '—'}</p>
    )}
  </div>
);

export default ProfileField;