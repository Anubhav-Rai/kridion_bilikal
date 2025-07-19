import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Building, User } from 'lucide-react';

const ContactUs = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleCallNow = () => {
    // This will open the phone app on mobile devices and prompt to call on desktop
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    const phoneNumber = '919876543210'; // Without + sign for WhatsApp
    const message = encodeURIComponent('Hello! I am interested in your products from KRIDION Agro.');
    
    // WhatsApp Web for desktop browsers, WhatsApp app for mobile
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open in new tab/window
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className={`rounded-xl overflow-hidden transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-emerald-800 to-teal-800' 
          : 'bg-gradient-to-r from-emerald-600 to-teal-600'
      } text-white`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Get in Touch</h1>
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100 leading-relaxed">
              Have questions about our products? Need bulk orders? We're here to help you 
              find the perfect kitchen essentials for your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl p-6 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-emerald-600" size={24} />
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="quality-concern">Quality Concern</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                  placeholder="Tell us about your requirements, questions, or feedback..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact Details */}
          <div className={`rounded-xl p-6 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-emerald-600 mt-1" size={18} />
                <div>
                  <h4 className={`font-medium text-sm transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Phone</h4>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>+91 98765 43210</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>+91 87654 32109</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="text-emerald-600 mt-1" size={18} />
                <div>
                  <h4 className={`font-medium text-sm transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Email</h4>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>info@kridion.com</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>orders@kridion.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="text-emerald-600 mt-1" size={18} />
                <div>
                  <h4 className={`font-medium text-sm transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Address</h4>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Plot No. 45, Industrial Area<br />
                    Jodhpur, Rajasthan 342001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="text-emerald-600 mt-1" size={18} />
                <div>
                  <h4 className={`font-medium text-sm transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Business Hours</h4>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className={`rounded-xl p-6 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>Business Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>GSTIN Number</span>
                <span className={`font-mono text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>2322143452342</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>PAN Number</span>
                <span className={`font-mono text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>ABCDE1234F</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>Established</span>
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>2023</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>License No.</span>
                <span className={`font-mono text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>FL-2023-0445</span>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className={`rounded-xl p-6 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-emerald-900/50 border-emerald-700' 
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
              darkMode ? 'text-emerald-400' : 'text-emerald-800'
            }`}>Need Immediate Help?</h3>
            
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              darkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              For urgent inquiries or bulk orders, call us directly or send a WhatsApp message.
            </p>
            
            <div className="space-y-2">
              <button 
                onClick={handleCallNow}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                📞 Call Now
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                💬 WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`rounded-xl p-6 border transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}>Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>What is your minimum order quantity?</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              For retail customers, there's no minimum order. For bulk orders, we offer 
              discounts starting from 10+ pieces of the same product.
            </p>
          </div>
          
          <div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>Do you ship internationally?</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Currently, we ship only within India. International shipping will be 
              available soon. Contact us for updates.
            </p>
          </div>
          
          <div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>How do you ensure product quality?</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              All our products undergo strict quality checks. Wooden items are food-grade 
              treated, and spices are tested for purity and freshness.
            </p>
          </div>
          
          <div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>What is your return policy?</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              We offer 7-day returns for damaged products. For custom wooden items, 
              returns are accepted only if there are quality issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;