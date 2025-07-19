import React from 'react';

const CompanyInfo = () => (
  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white overflow-hidden">
    <div className="px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🌿</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome to KRIDION Agro</h1>
          <p className="text-emerald-100">Premium Kitchen Essentials & Authentic Spices</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="font-semibold">Quality Assured</span>
          </div>
          <p className="text-sm text-emerald-100">Handcrafted products with authentic traditional methods</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🚚</span>
            <span className="font-semibold">Pan India Delivery</span>
          </div>
          <p className="text-sm text-emerald-100">Fast and secure shipping across all Indian states</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📞</span>
            <span className="font-semibold">24/7 Support</span>
          </div>
          <p className="text-sm text-emerald-100">Dedicated customer service for all your needs</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white/10 border-t border-white/20 px-8 py-4">
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-emerald-200 font-medium">GSTIN:</span>
          <span className="ml-2 font-mono">2322143452342</span>
        </div>
        <div>
          <span className="text-emerald-200 font-medium">Est:</span>
          <span className="ml-2">2023</span>
        </div>
        <div>
          <span className="text-emerald-200 font-medium">Email:</span>
          <span className="ml-2">info@kridion.com</span>
        </div>
        <div>
          <span className="text-emerald-200 font-medium">Phone:</span>
          <span className="ml-2">+91 98765 43210</span>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyInfo;
