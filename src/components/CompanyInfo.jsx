import React from 'react';

const CompanyInfo = ({ darkMode }) => (
  <div className={`rounded-xl text-white overflow-hidden transition-all duration-300 ${
    darkMode 
      ? 'bg-gradient-to-r from-emerald-700 to-teal-700' 
      : 'bg-gradient-to-r from-emerald-600 to-teal-600'
  }`}>
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
          darkMode ? 'bg-white/30' : 'bg-white/20'
        }`}>
          <span className="text-xl sm:text-2xl">🌿</span>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Welcome to KRIDION Agro</h1>
          <p className={`text-sm sm:text-base transition-colors duration-300 ${
            darkMode ? 'text-emerald-200' : 'text-emerald-100'
          }`}>Premium Kitchen Essentials & Authentic Spices</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className={`backdrop-blur-sm rounded-lg p-4 transition-colors duration-300 ${
          darkMode ? 'bg-white/15' : 'bg-white/10'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="font-semibold">Quality Assured</span>
          </div>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-emerald-200' : 'text-emerald-100'
          }`}>Handcrafted products with authentic traditional methods</p>
        </div>
        
        <div className={`backdrop-blur-sm rounded-lg p-4 transition-colors duration-300 ${
          darkMode ? 'bg-white/15' : 'bg-white/10'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🚚</span>
            <span className="font-semibold">Pan India Delivery</span>
          </div>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-emerald-200' : 'text-emerald-100'
          }`}>Fast and secure shipping across all Indian states</p>
        </div>
        
        <div className={`backdrop-blur-sm rounded-lg p-4 transition-colors duration-300 ${
          darkMode ? 'bg-white/15' : 'bg-white/10'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📞</span>
            <span className="font-semibold">24/7 Support</span>
          </div>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-emerald-200' : 'text-emerald-100'
          }`}>Dedicated customer service for all your needs</p>
        </div>
      </div>
    </div>
    
    <div className={`border-t px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/15 border-white/30' 
        : 'bg-white/10 border-white/20'
    }`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <span className={`font-medium transition-colors duration-300 ${
            darkMode ? 'text-emerald-300' : 'text-emerald-200'
          }`}>GSTIN:</span>
          <span className="ml-2 font-mono">2322143452342</span>
        </div>
        <div>
          <span className={`font-medium transition-colors duration-300 ${
            darkMode ? 'text-emerald-300' : 'text-emerald-200'
          }`}>Est:</span>
          <span className="ml-2">2023</span>
        </div>
        <div>
          <span className={`font-medium transition-colors duration-300 ${
            darkMode ? 'text-emerald-300' : 'text-emerald-200'
          }`}>Email:</span>
          <span className="ml-2">info@kridion.com</span>
        </div>
        <div>
          <span className={`font-medium transition-colors duration-300 ${
            darkMode ? 'text-emerald-300' : 'text-emerald-200'
          }`}>Phone:</span>
          <span className="ml-2">+91 98765 43210</span>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyInfo;
