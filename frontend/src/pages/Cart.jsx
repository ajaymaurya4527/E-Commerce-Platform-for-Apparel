import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

function Cart() {
  const { products, currency, cartItem, updateQuantity, navigate, accessToken } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item]) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  // Logic to handle login check (same as your ternary but cleaner inside return)
  if (!accessToken) {
    toast.error("Please login first", { toastId: "login-error" });
    return <div className='h-[60vh] flex items-center justify-center font-medium text-gray-500'>Redirecting to login...</div>;
  }

  return (
    <div className='border-t pt-14 bg-gray-50/30 min-h-screen px-4 sm:px-0'>
      
      <div className='text-3xl mb-10 prata-regular text-center sm:text-left'>
        <Title text1={"YOUR"} text2={"BAG"} />
      </div>

      <div className='flex flex-col lg:flex-row gap-12'>
        
        {/* Left Side: Cart Items List */}
        <div className='flex-1 space-y-4'>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className='bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-row items-center gap-4 sm:gap-6 transition-all hover:shadow-md'>
                  
                  {/* Product Image */}
                  <div className='bg-gray-50 rounded-xl overflow-hidden shrink-0'>
                    <img className='w-20 sm:w-28 object-cover' src={productData.image[0]} alt={productData.name} />
                  </div>

                  {/* Product Info */}
                  <div className='flex-1 flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='space-y-1'>
                      <p className='text-base sm:text-lg font-bold text-gray-800 line-clamp-1'>{productData.name}</p>
                      <div className='flex items-center gap-4 text-sm'>
                        <p className='text-orange-600 font-bold'>{currency}{productData.price}</p>
                        <span className='text-gray-300'>|</span>
                        <p className='text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase tracking-wider'>
                          Size: {item.size}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Control & Delete */}
                    <div className='flex items-center gap-6 self-end sm:self-center'>
                      <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50'>
                         <input 
                            onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                            className='w-12 sm:w-16 bg-transparent text-center py-2 text-sm font-bold outline-none' 
                            type="number" 
                            min={1} 
                            defaultValue={item.quantity} 
                          />
                      </div>
                      
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='p-2 hover:bg-red-50 rounded-full transition-colors group'
                      >
                        <img className='w-4 sm:w-5 group-hover:scale-110 transition-transform' src={assets.bin_icon} alt="remove" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300'>
               <p className='text-gray-400'>Your cart is currently empty.</p>
               <button onClick={()=>navigate('/collection')} className='mt-4 text-orange-600 font-bold underline'>Go Shopping</button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary Sidebar */}
        <div className='lg:w-[400px]'>
          <div className='bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-10'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>
            
            <CartTotal />
            
            <div className='mt-8 space-y-4'>
              <button 
                onClick={() => navigate("/place-order")} 
                className='w-full bg-gradient-to-r from-gray-900 to-black text-white text-sm font-black py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-gray-200'
              >
                PROCEED TO CHECKOUT
              </button>
              
              <p className='text-[10px] text-center text-gray-400 uppercase tracking-widest'>
                Secure Payment • 100% Original Products
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart;