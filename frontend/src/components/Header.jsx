import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router';
import { assets } from '../assets/assets.js'
import { ShopContext } from '../context/ShopContext.jsx';
import { ShoppingCart } from 'lucide-react';


function Header() {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount } = useContext(ShopContext);
  return (
    <header className='w-full' style={{ backgroundColor: "#dee0d1" }}>
      <nav className='w-full h-12'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link to="/" className="flex items-center mt-2 ml-2">
            <div className="flex items-center gap-2 ">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                MAURYA<span className="text-orange-600">SHOP</span>
              </span>
            </div>
          </Link>
          <li className='hidden lg:flex justify-center items-center gap-5 mr-8'>
            <NavLink to="/" className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                "text-orange-700" : "text-gray-900"
              } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
            }>
              <p>Home</p>
            </NavLink>
            <NavLink to="/collection" className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                "text-orange-700" : "text-gray-900"
              } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
            }>
              <p >Collaction</p>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                "text-orange-700" : "text-gray-900"
              } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
            }>
              <p>About</p>
            </NavLink>
            <NavLink to="/contactus" className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                "text-orange-700" : "text-gray-900"
              } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
            }>
              <p>Contact us</p>
            </NavLink>

          </li>
          <div className='flex items-center gap-5 mr-8'>
            <img onClick={() => setShowSearch(prev => !prev)} src={assets.search_icon} className='w-5 cursor-pointer ' alt='' />
            <div className='group relative cursor-pointer'>
              <Link to="/login"><img src={assets.profile_icon} className='h-6 w-5' alt='' /></Link>
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-28 py-5 text-gray-900 rounded items-center' style={{ backgroundColor: "#828768" }}>
                  <p className='cursor-pointer hover:text-orange-400'>My Profile</p>
                  <p className='cursor-pointer hover:text-orange-400'>Orders</p>
                  <p className='cursor-pointer hover:text-orange-400'>Logout</p>
                </div>
              </div>
            </div>
            <Link to="/cart" className='relative'>
              <img src={assets.cart_icon} className='w-5 h-6' />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-900 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick={() => setVisible(true)} src={assets.menu_icon} className='block md:hidden flex-col w-5 h-5 cursor-pointer' alt='' />
          </div>

          <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gray-300 transition-all  ${visible ? 'w-full h-screen ' : 'w-0 h-0'}`}>
            <div className='flex flex-col'>
              <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.dropdown_icon} className='h-4 rotate-180 cursor-pointer ' />
                <p>Back</p>
              </div>
              <NavLink onClick={() => setVisible(false)} to="/" className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                  "text-orange-700" : "text-gray-900"
                } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
              }>Home</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/collection" className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                  "text-orange-700" : "text-gray-900"
                } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
              }>Collaction</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/about" className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                  "text-orange-700" : "text-gray-900"
                } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
              }>About</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/contactus" className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ?
                  "text-orange-700" : "text-gray-900"
                } border-b border-gray-100
                                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                                          hover:text-orange-700 lg:p-0`
              }>Contact-us</NavLink>

            </div>

          </div>

        </div>

      </nav>
    </header>
  )
}

export default Header
