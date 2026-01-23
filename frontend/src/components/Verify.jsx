import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const { navigate, accessToken, backendUrl, setCartItem } = useContext(ShopContext)
    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!accessToken) return null

            // You need to create this endpoint in your backend to update 'payment: true'
            const response = await axios.post(backendUrl + '/order/verify', 
                { success, orderId }, 
                { headers: { accessToken } }
            )

            if (response.data.success) {
                setCartItem({})
                navigate('/orders')
                toast.success("Payment Successful!")
            } else {
                navigate('/cart')
                toast.error("Payment Failed")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [accessToken])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    )
}

export default Verify