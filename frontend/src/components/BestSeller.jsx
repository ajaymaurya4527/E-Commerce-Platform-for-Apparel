import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const { products } = useContext(ShopContext); 
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-20 relative px-4 sm:px-0'>
            {/* Background Decorative Element - Soft "Best Seller" Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent -z-10 pointer-events-none"></div>

            <div className='text-center py-10'>
                <div className='flex flex-col items-center gap-1'>
                    <Title text1={"BEST"} text2={"SELLERS"} />
                    {/* Unique Subtext Replacement for Lorem Ipsum */}
                    <p className='w-11/12 sm:w-2/3 md:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-500 font-medium mt-3 leading-relaxed'>
                        Our most-loved pieces, curated by you. Join the <span className='text-orange-600'>1,000 shoppers</span> who have made these our all-time favorites.
                    </p>
                </div>
            </div>

            {/* Product Grid with specialized spacing */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12'>
                {
                    bestSeller.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* "Trending" Badge - Only for Best Sellers */}
                            <div className="absolute top-2 left-2 z-10">
                                <span className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-orange-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    TOP RATED
                                </span>
                            </div>
                            
                            <div className="transition-transform duration-500 hover:scale-[1.02]">
                                <ProductItem 
                                    id={item._id} 
                                    image={item.image} 
                                    name={item.name} 
                                    price={item.price} 
                                />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Subtle bottom accent line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mt-16"></div>
        </div>
    )
}

export default BestSeller;