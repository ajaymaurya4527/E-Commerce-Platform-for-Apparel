import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    // Added overflow-hidden to contain animations and a smoother shadow
    <div className='flex flex-col sm:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 group'>
      
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 relative overflow-hidden'>
        
        {/* Subtle decorative background circle */}
        <div className='absolute -top-10 -left-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
        
        <div className='text-[#414141] z-10'>
          <div className='flex items-center gap-3 mb-2'>
            {/* Animated line: grows on hover */}
            <p className='w-8 md:w-11 h-[2px] bg-[#414141] transition-all duration-500 group-hover:w-16'></p>
            <p className='font-medium text-xs md:text-sm tracking-[0.2em] text-gray-500'>OUR BESTSELLER</p>
          </div>

          <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight transition-transform duration-500 group-hover:translate-x-2'>
            Latest <br className='hidden lg:block' /> Arrivals
          </h1>

          <div className='flex items-center gap-3 mt-4 cursor-pointer group/btn'>
            <p className='font-bold text-sm md:text-base tracking-widest relative'>
              SHOP NOW
              {/* Animated underline */}
              <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-[#414141] transition-all duration-300 group-hover/btn:w-full'></span>
            </p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <div className='w-full sm:w-1/2 overflow-hidden relative'>
        {/* The image now has a scale and subtle float effect */}
        <img 
          src={assets.hero_img} 
          className='w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1' 
          alt="Hero" 
        />
        
        {/* Glassmorphism overlay that appears on mobile to separate text if needed, or just for style */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none'></div>
      </div>

    </div>
  )
}

export default Hero