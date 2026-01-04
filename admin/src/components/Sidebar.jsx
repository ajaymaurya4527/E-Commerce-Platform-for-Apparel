import React from 'react'
import { NavLink } from 'react-router' // Ensure this matches your router version
import { assets } from "../assets/assets.js"

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r border-gray-100 bg-gray-50/30'>
      <div className='flex flex-col gap-2 pt-8 pr-0'>
        
        {/* Link Item */}
        <NavLink 
          to="/add" 
          className={({ isActive }) => `
            flex items-center gap-3 py-3 pl-6 transition-all duration-300 ease-in-out group
            ${isActive 
              ? 'bg-white text-orange-600 border-y border-l border-gray-200 rounded-l-full shadow-[-4px_4px_10px_rgba(0,0,0,0.02)] translate-x-1' 
              : 'text-gray-500 hover:text-gray-800 hover:translate-x-1'}
          `}
        >
          {/* Icon Container with hover animation */}
          <div className={`
            p-2 rounded-lg transition-all duration-300
            group-hover:bg-orange-50 group-[.active]:bg-orange-100
          `}>
            <img 
              className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-[.active]:rotate-12`} 
              src={assets.add_icon} 
              alt="Add" 
            />
          </div>

          <p className='hidden md:block font-medium tracking-tight'>Add Items</p>

          {/* Active Indicator Dot */}
          <div className="ml-auto mr-4 opacity-0 group-[.active]:opacity-100 transition-opacity">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
          </div>
        </NavLink>

        {/* List Link Example (Duplicate for visual consistency) */}
        <NavLink 
          to="/list" 
          className={({ isActive }) => `
            flex items-center gap-3 py-3 pl-6 transition-all duration-300 ease-in-out group
            ${isActive 
              ? 'bg-white text-orange-600 border-y border-l border-gray-200 rounded-l-full shadow-[-4px_4px_10px_rgba(0,0,0,0.02)] translate-x-1' 
              : 'text-gray-500 hover:text-gray-800 hover:translate-x-1'}
          `}
        >
          <div className="p-2 rounded-lg group-hover:bg-orange-50 group-[.active]:bg-orange-100">
            <img 
              className="w-5 h-5 transition-transform group-hover:scale-110" 
              src={assets.order_icon} 
              alt="List" 
            />
          </div>
          <p className='hidden md:block font-medium tracking-tight'>List Items</p>
          <div className="ml-auto mr-4 opacity-0 group-[.active]:opacity-100 transition-opacity">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
          </div>
        </NavLink>

        {/* order link*/}
        <NavLink 
          to="/orders" 
          className={({ isActive }) => `
            flex items-center gap-3 py-3 pl-6 transition-all duration-300 ease-in-out group
            ${isActive 
              ? 'bg-white text-orange-600 border-y border-l border-gray-200 rounded-l-full shadow-[-4px_4px_10px_rgba(0,0,0,0.02)] translate-x-1' 
              : 'text-gray-500 hover:text-gray-800 hover:translate-x-1'}
          `}
        >
          <div className="p-2 rounded-lg group-hover:bg-orange-50 group-[.active]:bg-orange-100">
            <img 
              className="w-5 h-5 transition-transform group-hover:scale-110" 
              src={assets.order_icon} 
              alt="List" 
            />
          </div>
          <p className='hidden md:block font-medium tracking-tight'>Orders</p>
          <div className="ml-auto mr-4 opacity-0 group-[.active]:opacity-100 transition-opacity">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
          </div>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar