import React from 'react';
import { Award, Leaf, Users, MapPin, Clock, Heart } from 'lucide-react';
import anubhavImage from '../assets/anubhav.jpeg';

const AboutUs = ({ darkMode }) => (
  <div className="space-y-8">
    {/* Hero Section */}
    <div className={`rounded-xl overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-r from-emerald-800 to-teal-800' 
        : 'bg-gradient-to-r from-emerald-600 to-teal-600'
    } text-white`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Story</h1>
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 leading-relaxed">
            From a small family kitchen to serving homes across India with premium wooden kitchenware, 
            authentic spices, and traditional mustard oil
          </p>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      {/* About Content */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
          darkMode 
            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
            : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 group-hover:text-emerald-400 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>About KRIDION Agro</h2>
          
          {/* Founder Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <div className="relative">
                <img
                  src={anubhavImage}
                  alt="AKSHAT YADAV MEENA Rai - Founder of KRIDION Agro"
                  className="w-full h-64 md:h-48 object-cover rounded-xl shadow-lg"
                />
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl p-4`}>
                  <h3 className="text-white font-semibold text-lg">Anubhav Rai</h3>
                  <p className="text-white/90 text-sm">Founder & CEO</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <p className={`leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Founded in 2023 by YADAV, KRIDION Agro emerged from a passion for preserving traditional Indian kitchen 
                practices while meeting modern quality standards. What started as a small venture by the Rai 
                family in Bangaluru has grown into a trusted name for authentic kitchen essentials.
              </p>
              
              <p className={`leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                "Our vision is to bring the authentic taste and quality of traditional Indian kitchen products 
                to every home, while supporting local artisans and farmers," says Anubhav, who comes from a 
                family with deep roots in traditional craftsmanship and agriculture.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className={`leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              We specialize in handcrafted wooden chopping boards made from sustainable teak and sheesham wood, 
              premium spices sourced directly from farms, and cold-pressed mustard oil prepared using 
              century-old traditional methods. Every product reflects our commitment to quality, authenticity, 
              and the rich culinary heritage of India.
            </p>
            
            <p className={`leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Our wooden products are crafted by skilled artisans who have been working with wood for generations. 
              Each piece is carefully selected, seasoned, and finished to ensure durability and food safety. 
              Our spices are sourced from organic farms and processed in small batches to retain their natural 
              oils and authentic flavors.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
            darkMode 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
              : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <Heart className="text-emerald-600 group-hover:scale-110 transition-transform duration-300" size={24} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 group-hover:text-emerald-400 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>Our Mission</h3>
            </div>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              To bring authentic, high-quality kitchen essentials to every Indian home while supporting 
              traditional artisans and sustainable farming practices.
            </p>
          </div>

          <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
            darkMode 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
              : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="text-emerald-600 group-hover:scale-110 transition-transform duration-300" size={24} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 group-hover:text-emerald-400 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>Our Vision</h3>
            </div>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              To become India's most trusted brand for traditional kitchen products while preserving 
              our culinary heritage for future generations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats & Features */}
      <div className="space-y-6">
        {/* Stats */}
        <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
          darkMode 
            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
            : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-emerald-400 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>Our Journey</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>Founded</span>
              <span className={`font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>2023</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>Happy Customers</span>
              <span className={`font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>2,500+</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>Cities Served</span>
              <span className={`font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>150+</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>Products</span>
              <span className={`font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>50+</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
          darkMode 
            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
            : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-emerald-400 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>Why Choose Us</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="text-emerald-600 mt-1 group-hover:scale-110 transition-transform duration-300" size={18} />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>Premium Quality</h4>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>Handpicked products with rigorous quality checks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="text-emerald-600 mt-1 group-hover:scale-110 transition-transform duration-300" size={18} />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>Artisan Support</h4>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>Supporting traditional craftsmen and farmers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="text-emerald-600 mt-1 group-hover:scale-110 transition-transform duration-300" size={18} />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>Pan India Delivery</h4>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>Fast and secure shipping nationwide</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="text-emerald-600 mt-1 group-hover:scale-110 transition-transform duration-300" size={18} />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>Fresh Products</h4>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>Made to order for maximum freshness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Product Categories */}
    <div className={`rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group ${
      darkMode 
        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
        : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 group-hover:text-emerald-400 ${
        darkMode ? 'text-white' : 'text-slate-900'
      }`}>Our Product Categories</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-4xl mb-3">🪵</div>
          <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>Wooden Kitchenware</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Handcrafted chopping boards, serving platters, and kitchen tools made from premium 
            teak and sheesham wood with food-safe finishes.
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3">🌶️</div>
          <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>Premium Spices</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Farm-fresh elaichi (cardamom), black pepper, cinnamon, and other authentic Indian 
            spices processed in small batches.
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3">🫒</div>
          <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>Mustard Oil & More</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Cold-pressed mustard oil (khali), sesame oil, and other traditional cooking oils 
            prepared using time-tested methods.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;