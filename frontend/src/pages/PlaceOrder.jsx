import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const [method, setMethod] = useState("cod")
  const { navigate, backendUrl, accessToken, cartItem, setCartItem, delivery_fee, products, getCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + "/order/place", orderData, { headers: { accessToken } })
          if (response.data.success) {
            setCartItem({})
            navigate("/orders")
          } else {
            toast.error(response.data.message)
          }
          break;
        default:
          toast.info("Online payment methods are coming soon!")
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while placing the order")
    }
  }

  return (
    // Added max-w-7xl and mx-auto to prevent the items from flying to the far edges on ultra-wide screens
    <form onSubmit={onSubmitHandler} className='max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-10 xl:gap-24 pt-10 sm:pt-16 min-h-[80vh] border-t border-gray-100 px-4 sm:px-6'>
      
      {/* Left-side: Delivery Information */}
      <div className='flex flex-col gap-6 w-full lg:max-w-[480px]'>
        <div className='text-2xl sm:text-3xl font-semibold'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className='space-y-4'>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='First name' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="email" placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='Street' />
          
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='City' />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='State' />
          </div>
          
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="number" placeholder='Zipcode' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="text" placeholder='Country' />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-black outline-none transition-all bg-gray-50/50 hover:bg-white' type="number" placeholder='Phone no.' />
        </div>
      </div>

      {/* Right-side: Summary & Payment */}
      {/* Changed flex-1 to w-full lg:w-[420px] to fix the stretching/gap issue */}
      <div className='w-full lg:w-[420px]'>
        
        <div className='bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm'>
          <CartTotal />
          
          <div className='mt-12'>
            <div className='mb-6'>
               <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            
            {/* Payment Method Selection */}
            <div className='flex flex-col gap-3 mt-4'>
              {/* Stripe */}
              <div onClick={() => setMethod("stripe")} className={`flex items-center border rounded-xl p-4 cursor-pointer transition-all ${method === "stripe" ? "border-orange-500 bg-orange-50/30" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}`}>
                <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === "stripe" ? "border-orange-500" : "border-gray-300"}`}>
                  {method === "stripe" && <div className='w-2 h-2 bg-orange-500 rounded-full'></div>}
                </div>
                <img className='h-5 ml-4' src={assets.stripe_logo} alt="Stripe" />
              </div>

              {/* Razorpay */}
              <div onClick={() => setMethod("razorpay")} className={`flex items-center border rounded-xl p-4 cursor-pointer transition-all ${method === "razorpay" ? "border-orange-500 bg-orange-50/30" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}`}>
                <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === "razorpay" ? "border-orange-500" : "border-gray-300"}`}>
                  {method === "razorpay" && <div className='w-2 h-2 bg-orange-500 rounded-full'></div>}
                </div>
                <img className='h-5 ml-4' src={assets.razorpay_logo} alt="Razorpay" />
              </div>

              {/* COD */}
              <div onClick={() => setMethod("cod")} className={`flex items-center border rounded-xl p-4 cursor-pointer transition-all ${method === "cod" ? "border-orange-500 bg-orange-50/30" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}`}>
                <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === "cod" ? "border-orange-500" : "border-gray-300"}`}>
                  {method === "cod" && <div className='w-2 h-2 bg-orange-500 rounded-full'></div>}
                </div>
                <p className='text-gray-600 text-xs font-bold ml-4 tracking-widest uppercase'>Cash on Delivery</p>
              </div>
            </div>

            <div className='mt-10'>
              <button type='submit' className='w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg'>
                PLACE ORDER
              </button>
              <div className='flex items-center justify-center gap-2 mt-4 opacity-50'>
                 <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                 <p className='text-[10px] text-gray-500 uppercase tracking-widest'>Secure Checkout Process</p>
                 <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder