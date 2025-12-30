import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import {useLocation} from "react-router";

function SearchBox() {

const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
const [visible,setVisible]=useState(false);
const location=useLocation();

useEffect(()=>{
  if (location.pathname.includes("collection")){
    setVisible(true)
  }else{
    setVisible(false)
  }

},[location])

  return showSearch && visible ? (
    <div className=' bg-slate-200 border-b text-center flex justify-center items-center'>
      <div className='flex flex-row justify-between w-3/4 md:w-1/2 border rounded-full mx-4 my-4 text-center py-2 '>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='text-center outline-none w-full' type="text" placeholder='Search' />
        <img className='w-4 h-4 mr-2 mt-1' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='w-3 h-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBox
