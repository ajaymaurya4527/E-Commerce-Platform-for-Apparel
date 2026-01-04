import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  Settings, 
  LogOut, 
  ChevronDown,
  ShoppingCart
} from 'lucide-react';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between bg-slate-200 px-8 backdrop-blur-md border-b border-gray-100">
      
      {/* Left Section: Brand/Logo */}
      <NavLink to="/">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-200">
          <ShoppingCart className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Maurya<span className="text-orange-600">Shop</span>
          </h1>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin Dashboard</p>
        </div>
      </div>

      </NavLink>

      {/* Middle Section: Search Bar */}
      <div className="hidden md:flex flex-1 justify-center px-10">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            className="block w-full rounded-2xl border-none bg-gray-100 py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all duration-200 outline-none"
            placeholder="Search orders, products, or customers..."
            type="search"
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-orange-600 transition-colors">
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          <Bell size={22} />
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-gray-200"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 rounded-xl p-1.5 pr-3 hover:bg-gray-50 transition-all"
          >
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-orange-100">
              <img 
                src="https://icon-library.com/images/admin-icon-png/admin-icon-png-20.jpg" 
                alt="Admin Avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">Admin Maurya Ajay</p>
              <p className="mt-1 text-xs font-medium text-gray-400">Super Admin</p>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <a href="#profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                <User size={18} /> My Profile
              </a>
              <a href="#settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                <Settings size={18} /> Settings
              </a>
              <hr className="my-1 border-gray-100" />
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;