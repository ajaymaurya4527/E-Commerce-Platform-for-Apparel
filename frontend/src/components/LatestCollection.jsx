import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {

    const {products}=useContext(ShopContext); //we can have assess of products values
    const [latestProduct,setLatestProduct]=useState([]);

    useEffect(()=>{
      setLatestProduct(products.slice(0,10))

    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLACTIONS"} />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quia exercitationem at,</p>

      </div>

      {/*rendering products item */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}  />
          ))
        }

      </div>

      
    </div>
  )
}

export default LatestCollection;
