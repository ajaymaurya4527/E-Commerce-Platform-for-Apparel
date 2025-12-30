import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

function Collection() {
  const {products,search,showSearch}=useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [catagory,setCatagory]=useState([]);
  const [subCatagory,setSubCatagory]=useState([]);
  const [sortType,setSortType]=useState([]);
  
  const toggleCatagory=(e)=>{
    if (catagory.includes(e.target.value)){
      setCatagory(prev=>prev.filter(item=>item !==e.target.value))
    }
    else {
      setCatagory(prev=>[...prev,e.target.value])
    }
  }
  const toggleSubCatagory=(e)=>{
    if (subCatagory.includes(e.target.value)){
      setSubCatagory(prev=>prev.filter(item=>item !==e.target.value))
    }
    else {
      setSubCatagory(prev=>[...prev,e.target.value])
    }

  }
  const applyFilter=()=>{
    let copyProducts=products.slice();

    if(showSearch && search){
      copyProducts=copyProducts.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(catagory.length>0){
      copyProducts=copyProducts.filter(item => catagory.includes(item.category));
    }
    if(subCatagory.length>0){
      copyProducts=copyProducts.filter(item => subCatagory.includes(item.subCategory));
    }
    
    
    setFilterProducts(copyProducts);

  };

  const sortProduct=()=>{
    let copyFilterProducts=filterProducts.slice();
    
    switch (sortType){
      case "low-high":
        setFilterProducts(copyFilterProducts.sort((a,b)=>(a.price-b.price)))
        break;
      case "high-low":
        setFilterProducts(copyFilterProducts.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    setFilterProducts(products);
  },[]);

  
  useEffect(()=>{
    applyFilter();

  },[catagory,subCatagory,search,showSearch])

  useEffect(()=>{
    sortProduct();

  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t mb-4'>
      {/* Filter options*/}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-2xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/*catagory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-6 mt-6 ${showFilter ? '':'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Men"} onChange={toggleCatagory} />Men
            </p>
            
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Women"} onChange={toggleCatagory} />Woman
            </p>
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Kids"} onChange={toggleCatagory} />Kids
            </p>

          </div>

        </div>
        {/*sub category filter*/}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block mb-2`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Topwear"} onChange={toggleSubCatagory} />Topwear
            </p>
            
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={toggleSubCatagory}  />Bottomwaer
            </p>
            <p className='flex gap-2 '>
              <input className='w-3' type="checkbox" value={"Winterwear"} onChange={toggleSubCatagory}  />Winterwaer
            </p>
          </div>
        </div>
      </div>
{/*right side ui*/}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title  text1={"ALL"} text2={"COLLECTION"}/>
          {/*options sort*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-400 text-sm px-2 mr-5'>
          <option value="relevent">Sort by:Relevent</option>
          <option value="low-high">Sort by:Low to High</option>
          <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>
        {/*map product */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }


        </div>


      </div>


    </div>
  )
}

export default Collection
