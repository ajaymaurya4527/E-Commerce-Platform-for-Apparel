import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from "react-router";

function SearchBox() {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ? (
        // Added animate-fadeIn and sticky positioning
        <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 text-center flex justify-center items-center py-4 transition-all duration-500 animate-in fade-in slide-in-from-top-4'>
            
            <div className='relative flex items-center w-[90%] md:w-1/2 group'>
                {/* Enhanced Search Input Container */}
                <div className='flex flex-row items-center w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-2.5 transition-all duration-300 group-focus-within:bg-white group-focus-within:ring-4 group-focus-within:ring-orange-100 group-focus-within:border-orange-400'>
                    
                    <img className='w-4 h-4 opacity-50 group-focus-within:opacity-100 transition-opacity' src={assets.search_icon} alt="" />
                    
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className='bg-transparent outline-none w-full px-4 text-sm text-gray-700 placeholder-gray-400' 
                        type="text" 
                        placeholder='Search for products, brands and more...' 
                    />

                    {/* Clear Input Shortcut (Visual only, or you could add logic to clear) */}
                    {search && (
                        <p onClick={() => setSearch('')} className='text-[10px] font-bold text-gray-400 cursor-pointer hover:text-gray-900 transition-colors'>CLEAR</p>
                    )}
                </div>

                {/* Close Button - Positioned to the side with better hit area */}
                <div className='ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shrink-0'>
                    <img 
                        onClick={() => setShowSearch(false)} 
                        className='w-3 h-3 opacity-60 hover:opacity-100 transition-opacity' 
                        src={assets.cross_icon} 
                        alt="close" 
                    />
                </div>
            </div>

            {/* Subtle decorative glow behind search */}
            <div className='absolute -z-10 w-1/2 h-full bg-orange-100/20 blur-3xl rounded-full'></div>
        </div>
    ) : null
}

export default SearchBox