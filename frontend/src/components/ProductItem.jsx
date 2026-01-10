import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom' // Ensure this matches your router version

function ProductItem({id, image, name, price}) {
    const {currency} = useContext(ShopContext)

    return (
        <Link 
            className="group block text-gray-700 cursor-pointer" 
            to={`/product/${id}`}
        >
            {/* Image Container */}
            <div className='relative overflow-hidden rounded-2xl bg-[#f9f9f9] aspect-[3/4]'>
                {/* Secondary Image Overlay (Optional logic: if you have a 2nd image, it shows on hover) */}
                <img 
                    src={image[0]} 
                    alt={name}
                    className='w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-110'
                />

                {/* Glassmorphism Quick View Bar */}
                <div className='absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/70 backdrop-blur-md py-3 text-center'>
                    <p className='text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase'>
                        View Details
                    </p>
                </div>
                
                {/* Wishlist Heart Icon Placeholder */}
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                   <div className='bg-white/80 p-1.5 rounded-full hover:bg-white shadow-sm'>
                        <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                   </div>
                </div>
            </div>

            {/* Product Details */}
            <div className='mt-4 space-y-1 px-1'>
                <p className='text-xs text-gray-400 uppercase tracking-widest font-semibold'>New Season</p>
                <h3 className='text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors'>
                    {name}
                </h3>
                <div className='flex items-center gap-2'>
                    <p className='text-sm font-bold text-gray-900'>
                        {currency}{price}
                    </p>
                    {/* Visual trick: fake discount for "Interest" */}
                    <p className='text-[10px] text-gray-400 line-through'>
                        {currency}{Math.round(price * 1.2)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem