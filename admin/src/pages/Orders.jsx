import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContex'
import { useState } from 'react'
import { backendUrl, currency } from '../Layout'
import { useEffect } from 'react'
import axios from "axios";
import {toast} from "react-toastify"

function Orders() {

  const {token}=useContext(AdminContext)
  const [Orders,setOrders]=useState([])

  const fetchAllOrders=async ()=>{
    if(!token){
      return null;
    }

    try {
      const response=await axios.post(backendUrl + "/order/list-orders",{},{headers:{token}})

      if(response.data.success){
        setOrders(response.data.Orders)
      }else{
        toast.error(response.data.message)
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }


  }
  useEffect(()=>{
    fetchAllOrders();
  },[token])

  return (
    <div>
      
    </div>
  )
}

export default Orders
