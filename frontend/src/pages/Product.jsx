import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

function Product() {

  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState("")
  const [size,setSize]=useState("")

  const fetchProduct=async ()=>{

    products.map((item)=>{
      if (item._id ===productId){
        setProductData(item)
        
        setImage(item.image[0])
        return null;
      }
    })

  }
  useEffect(()=>{
    fetchProduct();
  },[productId,products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 mb-5'>
      {/* product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*product images*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto  sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* product info*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-4 text-gray-500 '>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size:</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`gap-8 border px-2 bg-gray-300 hover:bg-orange-500 ${item === size ? "bg-orange-500":""} `} key={index}>{item}</button>

                ))
              }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white cursor-pointer px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-8 flex flex-col gap-2'>
            <p>100% original product.</p>
            <p>cash on dilivery available on this product.</p>
            <p>Easy return and exchange policy within 7days.</p>
          </div>
        </div>
      </div>
      
      {/* description and review system*/}
      <div className='mt-10'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Command attention with this sharp, slim-fit suit. Expertly tailored from fine Italian-spun wool, it offers a sophisticated silhouette that moves with you, not against you. Whether it's a crucial business meeting or a special occasion, this suit ensures you look and feel your absolute best.</p>
          <p> Is a life-size or partial model of the human body used to display clothing, accessories, and other fashion items in a realistic and visually appealing manner. They are crucial for visual merchandising, helping customers visualize how garments look on a body. </p>
        </div>

      </div>

      {/*display related products*/}
      <RelatedProduct catagory={productData.category} subCatagory={productData.subCategory} />

      
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
