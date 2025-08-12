import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connectionPulse, setConnectionPulse] = useState(false);

  const role = useSelector(selectUserRole);
  const id = useSelector(selectUserId);
  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Connection pulse
    const pulseInterval = setInterval(() => {
      setConnectionPulse(prev => !prev);
    }, 1500);

    return () => {
      clearInterval(timeInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleGoHome = () => {
    navigate(`/${role}/dashboard/${id}`);
  };

  const handleContactSupport = () => {
    // Replace with actual support contact
    window.location.href = 'mailto:support@meteringcompany.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">

      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-indigo-500/15 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl w-full">

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <div className={`w-3 h-3 rounded-full mr-3 ${connectionPulse ? 'bg-red-400' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-white/90 text-sm font-medium">System Connection Lost</span>
              <div className="ml-4 text-white/60 text-xs font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Error Display */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <h1 className="text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-300 mb-4 tracking-tight">
                  404
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto lg:mx-0 mb-6"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Endpoint Not Found
                </h2>
                <p className="text-xl text-blue-200 mb-2">
                  The metering endpoint you requested is currently unavailable
                </p>
                <p className="text-blue-300/80">
                  This could be due to maintenance, network issues, or an invalid URL
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleGoHome}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 border border-blue-500/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Return to Dashboard</span>
                </button>

                <button
                  onClick={handleContactSupport}
                  className="group bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Contact Support</span>
                </button>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            {/* <div className="flex justify-center items-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Service Unavailable</h3>
                  <p className="text-blue-200/80 leading-relaxed">
                    The requested metering service is temporarily offline. Our team has been notified and is working to restore access.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;