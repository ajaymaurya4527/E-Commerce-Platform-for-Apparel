import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Image Column */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={assets.about_img} 
                alt="Our Team" 
                className="relative rounded-2xl shadow-2xl leading-none w-full object-cover h-[500px]"
              />
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20 hidden md:block">
                <p className="text-4xl font-bold text-indigo-600">10+</p>
                <p className="text-gray-600 text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide uppercase">
              Our Story
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Wear Your Confidence. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Elegance</span> in Every Thread.
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              At MauryaShop, we believe that every outfit tells a story. From street-style essentials to timeless classics, our collections are curated to help you express your unique identity through every stitch and fabric.
            </p>

            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-800">Visionary</h4>
                <p className="text-gray-500 text-sm">Thinking three steps ahead of the current industry trends.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-800">Reliable</h4>
                <p className="text-gray-500 text-sm">A consistent track record of delivering high-quality solutions.</p>
              </div>
            </div>

            <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-indigo-200">
              Learn More About Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;