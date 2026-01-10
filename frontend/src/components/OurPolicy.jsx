import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  // Logic: Centralizing data makes it easier to update or add new policies later
  const policies = [
    {
      id: 1,
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Hassle-free exchange process for a perfect fit every time.",
    },
    {
      id: 2,
      icon: assets.quality_icon,
      title: "7-Day Return Policy",
      description: "Not what you expected? Send it back for free within 7 days.",
    },
    {
      id: 3,
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description: "Our dedicated team is always here to help you, day or night.",
    },
  ];

  return (
    <section className="pb-10 bg-gradient-to-b from-white to-[#f9fffe]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Optional: Add a section header for better UX */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Shop With Us?
          </h2>
          <div className="w-20 h-1 bg-[#00df9a] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy) => (
            <div 
              key={policy.id} 
              className="group relative p-8 bg-white border border-gray-100 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Decorative background element on hover */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ecfefa] rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 transform group-hover:scale-150" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#ecfefa] rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-[10deg] group-hover:bg-[#00df9a]/10">
                  <img 
                    src={policy.icon} 
                    alt={policy.title} 
                    className="w-10 h-10 object-contain" 
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#00df9a] transition-colors">
                  {policy.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </div>
              
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#00df9a] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;