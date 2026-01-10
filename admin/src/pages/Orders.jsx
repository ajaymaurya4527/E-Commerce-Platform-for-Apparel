import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContex'
import { backendUrl, currency } from '../Layout'
import axios from "axios";
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

function Orders() {
  const { token,search } = useContext(AdminContext)
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + "/order/list-orders", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
        console.log(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/order/update-status",
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Status Updated")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  const filteredOrders = orders.filter((order) => {
    const customerName = `${order.address.firstName} ${order.address.lastName}`.toLowerCase();
    const searchLower = search.toLowerCase();
    
    // Checking if customer name matches OR if any item name in the order matches
    return customerName.includes(searchLower) || 
           order.orderItems.some(item => item.name.toLowerCase().includes(searchLower));
  });

  return (
    <div className='p-4 sm:p-6'>
      <h3 className='text-xl font-semibold mb-6 text-gray-800'>Order Management</h3>

      <div className='flex flex-col gap-4'>
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-5 md:p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700'
          >
            {/* Column 1: Icon */}
            <div className='flex justify-center sm:justify-start'>
              <img className='w-12 lg:w-16 p-2 bg-gray-50 rounded-md border border-gray-100' src={assets.parcel_icon} alt="Order" />
            </div>

            {/* Column 2: Order Items & Address */}
            <div className='space-y-3'>
              <div>
                <p className='text-sm font-bold text-gray-900'>Items</p>
                <div className='text-sm text-gray-600 mt-1 leading-relaxed'>
                  {order.orderItems.map((item, idx) => (
                    <span key={idx}>
                      <span key={idx} className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                        <span className="font-semibold text-gray-800">{item.name}</span>

                        {/* The Quantity "X" Replacement */}
                        <span className="flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 rounded-full shadow-inner">
                          {item.quantity}
                        </span>

                        <span className="text-gray-400 text-xs font-medium">({item.size})</span>
                        {idx !== order.orderItems.length - 1 && <span className="text-gray-300 ml-1">|</span>}
                      </span>
                      {idx !== order.orderItems.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              <div className='pt-2 border-t border-gray-50'>
                <p className='font-bold text-gray-900'>{order.address.firstName + " " + order.address.lastName}</p>
                <p className='text-sm text-gray-500'>{order.address.street + ","}</p>
                <p className='text-sm text-gray-500 italic'>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                <p className='text-sm font-medium mt-1 text-gray-700'>{order.address.phone}</p>
              </div>
            </div>

            {/* Column 3: Logistics Info */}
            <div className='text-sm flex flex-col gap-1'>
              <p className='font-semibold'>Stats</p>
              <p className='mt-2'>Items: <span className='font-medium'>{order.orderItems.length}</span></p>
              <p>Method: <span className='px-2 py-0.5 bg-gray-100 rounded text-[11px] uppercase tracking-wider font-bold'>{order.paymentMethod}</span></p>
              <p>Payment: <span className={order.payment ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>{order.payment ? "Completed" : "Pending"}</span></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Column 4: Price */}
            <div className='text-lg font-bold text-gray-900 sm:text-center'>
              {currency}{order.orderPrice}
            </div>

            {/* Column 5: Actions */}
            <div className='flex items-center lg:justify-end'>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className='w-full lg:w-40 p-2 text-sm font-semibold bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders