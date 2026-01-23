import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router';
import { assets } from '../assets/assets.js'
import { ShopContext } from '../context/ShopContext.jsx';
import { ShoppingCart, Search, User, Menu, X, ChevronRight } from 'lucide-react';

function Header() {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount, accessToken, navigate, setAccessToken, setCartItem } = useContext(ShopContext);
 
   useEffect(()=>{
    if(!accessToken){
      navigate("/login")
    }
   },[accessToken])

   const logout=()=>{
    setAccessToken("")
    localStorage.removeItem("accessToken")
    setCartItem({})

   }
  

  // Dynamic NavLink Styling for Desktop
  const navLinkStyles = ({ isActive }) =>
    `relative py-1 text-sm lg:text-base transition-all duration-300 font-medium ${
      isActive ? "text-orange-600 after:w-full" : "text-gray-700 hover:text-orange-600 after:w-0"
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300`;

  return (
    <header className='sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm'>
      {/* Container with responsive max-width */}
      <nav className='max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12'>
        <div className='flex justify-between items-center h-16 sm:h-20'>
          
          {/* --- LOGO SECTION --- */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-orange-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-md">
                <ShoppingCart className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-slate-800">
                MAURYA<span className="text-orange-600">SHOP</span>
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION (Hidden on Mobile/Tablet) --- */}
          <ul className='hidden md:flex items-center gap-4 lg:gap-8'>
            <NavLink to="/" className={navLinkStyles}>Home</NavLink>
            <NavLink to="/collection" className={navLinkStyles}>Collection</NavLink>
            <NavLink to="/about" className={navLinkStyles}>About</NavLink>
            <NavLink to="/contactus" className={navLinkStyles}>Contact Us</NavLink>
          </ul>

          {/* --- ACTION ICONS --- */}
          <div className='flex items-center gap-3 sm:gap-5'>
            {/* Search */}
            <Link to="/collection">
            <button 
              onClick={() => setShowSearch(prev => !prev)}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all"
            >
              <Search className="w-5 h-5" />
            </button>
            </Link>

            {/* Profile */}
            <div className='group relative'>
              <div onClick={()=>accessToken ? null:navigate("/login")} className="p-1.5 sm:p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all block">
                <User className="w-5 h-5" />
              </div>
              
              {/* Profile Dropdown (Desktop Only) */}
              {
                accessToken &&
                <div className='hidden group-hover:block absolute right-0 pt-4'>
                <div className='w-40 bg-white border border-gray-100 shadow-xl rounded-xl py-2'>
                  <p onClick={()=>navigate("/profile")} className='px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer'>My Profile</p>
                  <p onClick={()=>navigate("/orders")} className='px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer'>Orders</p>
                  <hr className="my-1 border-gray-50" />
                  <button onClick={logout} className='px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer'>Logout</button>
                </div>
              </div>
              }
            </div>

            {/* Cart */}
            <Link to="/cart" className='relative p-1.5 sm:p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all'>
              <ShoppingCart className="w-5 h-5" />
              <span className='absolute top-0 right-0 sm:top-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-orange-600 text-white font-bold rounded-full text-[8px] sm:text-[10px]'>
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Toggle (Visible only on Mobile/Tablet) */}
            <button 
              onClick={() => setVisible(true)} 
              className='md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg'
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR MENU --- */}
        {/* Overlay Backdrop */}
        <div className={`fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`absolute top-0 right-0 bottom-0 w-[75%] max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex flex-col h-full'>
              {/* Header inside Sidebar */}
              <div className='flex items-center justify-between p-5 border-b border-gray-100'>
                <span className="font-bold text-gray-800 uppercase tracking-widest text-sm">Navigation</span>
                <button onClick={() => setVisible(false)} className='p-2 hover:bg-gray-100 rounded-full'>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className='flex flex-col overflow-y-auto'>
                {[
                  { path: '/', label: 'Home' },
                  { path: '/collection', label: 'Collection' },
                  { path: '/about', label: 'About' },
                  { path: '/contactus', label: 'Contact Us' }
                ].map((item) => (
                  <NavLink 
                    key={item.path}
                    onClick={() => setVisible(false)} 
                    to={item.path}
                    className={({ isActive }) => `flex items-center justify-between px-6 py-5 border-b border-gray-50 transition-all ${isActive ? 'bg-orange-50 text-orange-600 border-l-4 border-l-orange-600' : 'text-gray-700 active:bg-gray-100'}`}
                  >
                    <span className="text-base font-semibold">{item.label}</span>
                    <ChevronRight size={18} className="opacity-50" />
                  </NavLink>
                ))}
              </div>

              {/* Sidebar Footer (Optional styling) */}
              <div className="mt-auto p-6 bg-gray-50">
                  <p className="text-xs text-gray-400 text-center">© 2026 MAURYA SHOP</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header