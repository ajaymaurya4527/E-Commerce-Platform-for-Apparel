import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router';

function LatestCollection() {

    const { products } = useContext(ShopContext); 
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-16 px-4 sm:px-0'>
            {/* Header Section with Refined Text */}
            <div className='text-center py-10'>
                <div className='inline-flex items-center justify-center gap-2 mb-3'>
                    <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                </div>
                
                <p className='w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-light'>
                    Discover our newest curation of <span className='text-gray-800 font-medium'>trend-setting essentials</span>. 
                    From modern silhouettes to timeless classics, explore the pieces defined by superior craft and contemporary design.
                </p>
                
                {/* Subtle Decorative Divider */}
                <div className='flex items-center justify-center mt-6'>
                    <div className='h-[1px] w-12 bg-gray-200'></div>
                    <div className='h-1.5 w-1.5 rounded-full bg-orange-400 mx-3'></div>
                    <div className='h-[1px] w-12 bg-gray-200'></div>
                </div>
            </div>

            {/* Rendering products item with staggered entrance feel */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10'>
                {
                    latestProduct.map((item, index) => (
                        <div 
                            key={index} 
                            className='transition-all duration-500 hover:-translate-y-2'
                        >
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price}  
                            />
                        </div>
                    ))
                }
            </div>

            {/* Bottom Call to Action - Optional UX boost */}
            <div className='text-center mt-12'>
                <Link to="/collection">
                <button className='text-xs uppercase tracking-[0.2em] font-bold py-3 px-8 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300'>
                    View All Products
                </button>
                </Link>
            </div>
        </div>
    )
}

export default LatestCollection;