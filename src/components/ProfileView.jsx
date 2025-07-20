import React from 'react';

const ProfileView = ({ user, darkMode }) => (
  <div className="max-w-2xl mx-auto space-y-12">
    {/* Hero Section */}
    <div className="text-center space-y-6">
      <h1 className={`text-5xl lg:text-6xl font-black tracking-tight transition-all duration-700 ${
        darkMode ? 'text-white' : 'text-black'
      }`}>
        Your
        <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Profile
        </span>
      </h1>
      <p className={`text-xl leading-relaxed ${
        darkMode ? 'text-white/70' : 'text-black/70'
      }`}>
        Manage your account information
      </p>
    </div>
    
    <div className={`rounded-3xl backdrop-blur-xl border p-12 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-black/5 border-black/10'
    }`}>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={user?.name || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={user?.email || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={user?.phone || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
    </div>
    </div>
  </div>
);

export default ProfileView;
