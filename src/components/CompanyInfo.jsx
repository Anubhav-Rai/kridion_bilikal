import React from 'react';

const CompanyInfo = () => (
  <div className="bg-white/90 rounded-2xl p-6 mb-8 shadow flex flex-col gap-8">
    {/* Company Info */}
    <div className="flex gap-4 items-start">
      <div className="text-4xl">📋</div>
      <div>
        <div className="text-xl font-bold mb-2">Company Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700">
          <div>
            <span className="font-semibold">GSTIN Number: </span>2322143452342
          </div>
          <div>
            <span className="font-semibold">Business Type: </span>Premium Kitchen Essentials & Spices
          </div>
          <div>
            <span className="font-semibold">Established: </span>Serving quality since 2023
          </div>
          <div>
            <span className="font-semibold">Specialty: </span>Handcrafted Wood Products & Authentic Spices
          </div>
        </div>
      </div>
    </div>

    {/* Contact Info */}
    <div className="flex gap-4 items-start mt-2">
      <div className="text-4xl">📞</div>
      <div>
        <div className="text-xl font-bold mb-2">Get in Touch</div>
        <div className="space-y-1 text-gray-700">
          <div>
            <span className="font-semibold">For orders, inquiries, or custom requirements, please contact us:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📧</span>
            <span><span className="font-semibold">Email</span>: info@kridion.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📱</span>
            <span><span className="font-semibold">Phone</span>: +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏰</span>
            <span><span className="font-semibold">Business Hours</span>: Mon-Sat: 9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <span><span className="font-semibold">Delivery</span>: Pan India Shipping Available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyInfo;
