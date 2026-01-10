import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

function Order() {
  const { backendUrl, accessToken, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([])

  const loadOrderData = async () => {
    if (!accessToken) return null;
    try {
      const response = await axios.post(backendUrl + "/order/user-orders", {}, { headers: { accessToken } })
      if (response.data.success) {
        let allOrders = []
        response.data.orders.map((order) => {
          order.orderItems.map((item) => {
            item["status"] = order.status
            item["payment"] = order.payment
            item["paymentMethod"] = order.paymentMethod
            item["date"] = order.date // Unified to lowercase 'd'
            allOrders.push(item)
          })
        })
        setOrders(allOrders.reverse())
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [accessToken])

  return (
    <div className='border-t pt-16 bg-gray-50/20 min-h-screen px-2 sm:px-6'>
      <div className='text-3xl mb-8'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className='flex flex-col gap-6'>
        {orders.map((item, index) => (
          <div 
            key={index} 
            className='bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6'
          >
            {/* Left Section: Image and Basic Info */}
            <div className='flex items-center gap-6'>
              <div className='w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0'>
                <img 
                  className='w-full h-full object-cover' 
                  src={item.image[0]} 
                  alt={item.name} 
                />
              </div>
              
              <div className='flex flex-col gap-1'>
                <p className='text-base sm:text-lg font-bold text-gray-800 line-clamp-1'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600'>
                  <p className='font-bold text-orange-600'>{currency}{item.price}</p>
                  <span className='hidden sm:block text-gray-300'>|</span>
                  <p>Qty: <span className='font-medium'>{item.quantity}</span></p>
                  <span className='hidden sm:block text-gray-300'>|</span>
                  <p>Size: <span className='px-2 py-0.5 bg-gray-100 rounded text-xs'>{item.size}</span></p>
                </div>
                <div className='mt-3 space-y-1 text-xs sm:text-sm'>
                  <p className='text-gray-500'>Date: <span className='text-gray-800 font-medium'>{new Date(item.date).toDateString()}</span></p>
                  <p className='text-gray-500'>Payment: <span className='text-gray-800 font-medium uppercase'>{item.paymentMethod}</span></p>
                </div>
              </div>
            </div>

            {/* Right Section: Status and Tracking */}
            <div className='flex flex-row md:flex-col lg:flex-row items-center justify-between md:justify-center gap-4 lg:gap-10 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0'>
              
              {/* Status Indicator */}
              <div className='flex items-center gap-2'>
                <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'} animate-pulse`}></span>
                <p className='text-sm sm:text-base font-medium text-gray-700'>{item.status}</p>
              </div>

              {/* Action Button */}
              <button 
                onClick={loadOrderData} 
                className='px-6 py-2.5 border border-gray-900 text-xs sm:text-sm font-bold rounded-full hover:bg-black hover:text-white transition-all duration-300 active:scale-95 shadow-sm'
              >
                Track Order
              </button>
            </div>

          </div>
        ))}

        {orders.length === 0 && (
          <div className='text-center py-24'>
            <p className='text-gray-400 italic'>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order