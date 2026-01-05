import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { backendUrl, currency } from '../Layout'
import { toast } from 'react-toastify'
import { X, Package, Trash2, LayoutGrid } from 'lucide-react'
import { AdminContext } from '../context/AdminContex'

function List() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const {token,setToken}=useContext(AdminContext)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/product/list")
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct=async (id)=>{
    try {
      const response=await axios.post(backendUrl + "/product/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {

      toast.error(error)
      
    }

  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="w-full px-4 md:px-10 py-6 bg-[#f8fafc] min-h-screen">
      
      {/* --- Header Section (Slightly more compact) --- */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                <Package className="text-white" size={28} />
            </div>
            Product Inventory
          </h1>
          <p className="text-slate-500 text-lg mt-2 ml-1 font-medium">Full Catalog Management</p>
        </div>
        
        <div className="flex items-center">
           <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
             <LayoutGrid size={20} className="text-indigo-500" />
             <span className="text-md font-bold text-slate-700">
                {list.length} Products Found
             </span>
           </div>
        </div>
      </div>

      {/* --- Main List Container --- */}
      <div className='w-full bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-200 overflow-hidden'>
        
        {/* ---- Table Header (Reduced vertical padding) ---- */}
        <div className='hidden md:grid grid-cols-[1.2fr_5fr_2fr_1.5fr_0.8fr] items-center py-5 px-10 bg-slate-50/50 border-b border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]'>
          <span>Thumbnail</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Pricing</span>
          <span className='text-right'>Action</span>
        </div>

        {/* ----- List Content ----- */}
        <div className="divide-y divide-slate-100">
          {loading ? (
             <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-xl text-indigo-900">Syncing Database...</p>
             </div>
          ) : list.length > 0 ? (
            list.map((item, index) => (
              <div 
                key={index} 
                // Changed: Reduced py-10 to py-6 (approx 30-40% reduction)
                className='grid grid-cols-[80px_1fr_auto] md:grid-cols-[1.2fr_5fr_2fr_1.5fr_0.8fr] items-center gap-6 py-6 px-6 md:px-10 hover:bg-slate-50 transition-all duration-300 group'
              >
                {/* Image Wrap (Reduced size by 30%) */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <img 
                    className='w-full h-full object-cover rounded-[1rem] border-2 border-white bg-slate-100 shadow-md group-hover:scale-105 transition-transform duration-500' 
                    src={item.image[0]} 
                    alt={item.name} 
                  />
                </div>
                
                {/* Name & Mobile Info */}
                <div className="flex flex-col gap-1">
                  <p className='font-black text-slate-800 text-lg md:text-2xl tracking-tight leading-none'>
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className='px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase md:hidden'>
                      {item.category}
                    </span>
                    <p className="text-slate-400 text-xs hidden md:block font-medium italic">SKU: PRD-{index + 1000}</p>
                  </div>
                </div>

                {/* Category (Desktop) */}
                <div className='hidden md:block'>
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black border border-indigo-100 uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>

                {/* Price (Slightly smaller text) */}
                <div className='text-slate-900 font-black text-xl md:text-3xl flex items-baseline gap-1'>
                  <span className="text-indigo-600 text-xs md:text-base font-bold">{currency}</span>
                  {item.price.toLocaleString()}
                </div>

                {/* Action (More compact button) */}
                <div className='flex justify-end'>
                  <button className='p-3.5 bg-white hover:bg-red-600 text-slate-300 hover:text-white rounded-xl border border-slate-100 hover:border-red-600 shadow-sm transition-all duration-300'>
                    <Trash2 onClick={()=>removeProduct(item._id)} size={22} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center flex flex-col items-center">
               <Package size={60} className="text-slate-200 mb-4" />
               <p className="text-slate-500 text-xl font-black italic">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List