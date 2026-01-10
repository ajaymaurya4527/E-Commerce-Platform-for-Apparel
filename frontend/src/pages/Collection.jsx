import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
  const [sortType, setSortType] = useState([]);

  // --- Logic remains identical to your original code ---
  const toggleCatagory = (e) => {
    if (catagory.includes(e.target.value)) {
      setCatagory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCatagory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCatagory = (e) => {
    if (subCatagory.includes(e.target.value)) {
      setSubCatagory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCatagory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let copyProducts = products.slice();
    if (showSearch && search) {
      copyProducts = copyProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (catagory.length > 0) {
      copyProducts = copyProducts.filter(item => catagory.includes(item.category));
    }
    if (subCatagory.length > 0) {
      copyProducts = copyProducts.filter(item => subCatagory.includes(item.subCategory));
    }
    setFilterProducts(copyProducts);
  };

  const sortProduct = () => {
    let copyFilterProducts = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(copyFilterProducts.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setFilterProducts(copyFilterProducts.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => { setFilterProducts(products); }, [products]);
  useEffect(() => { applyFilter(); }, [catagory, subCatagory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  return (
    <div className='flex flex-col lg:flex-row gap-8 pt-10 border-t border-gray-100 mb-10 px-4 sm:px-0'>
      
      {/* --- Filter Sidebar --- */}
      <div className='lg:min-w-64'>
        {/* Filter Header with Animated Toggle for Mobile */}
        <div 
          onClick={() => setShowFilter(!showFilter)} 
          className='group flex items-center justify-between lg:justify-start cursor-pointer gap-3 bg-gray-50 lg:bg-transparent p-4 lg:p-0 rounded-xl transition-all'
        >
          <p className='text-xl font-bold text-gray-800 tracking-tight'>Filters</p>
          <img 
            className={`h-3 transition-transform duration-300 lg:hidden ${showFilter ? 'rotate-180' : ''}`} 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </div>

        {/* Filter Content Container */}
        <div className={`${showFilter ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} lg:max-h-none lg:opacity-100 overflow-hidden transition-all duration-500 ease-in-out`}>
          
          {/* Category Filter */}
          <div className='bg-white lg:bg-transparent border border-gray-100 lg:border-none p-5 lg:p-0 rounded-2xl mt-6 shadow-sm lg:shadow-none'>
            <p className='mb-4 text-xs font-black tracking-[0.15em] text-orange-600 uppercase'>Categories</p>
            <div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                  <input 
                    className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-600' 
                    type="checkbox" 
                    value={cat} 
                    onChange={toggleCatagory} 
                  />
                  <span className='group-hover:text-black transition-colors'>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Category Filter */}
          <div className='bg-white lg:bg-transparent border border-gray-100 lg:border-none p-5 lg:p-0 rounded-2xl mt-8 shadow-sm lg:shadow-none mb-4'>
            <p className='mb-4 text-xs font-black tracking-[0.15em] text-orange-600 uppercase'>Type</p>
            <div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className='flex items-center gap-3 cursor-pointer group'>
                  <input 
                    className='w-4 h-4 rounded border-gray-300 accent-orange-600 cursor-pointer' 
                    type="checkbox" 
                    value={type} 
                    onChange={toggleSubCatagory} 
                  />
                  <span className='group-hover:text-black transition-colors'>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Collection Section --- */}
      <div className='flex-1'>
        {/* Header Controls */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          
          {/* Custom Styled Sort Dropdown */}
          <div className='relative w-full sm:w-auto'>
            <select 
              onChange={(e) => setSortType(e.target.value)} 
              className='appearance-none w-full sm:w-60 bg-white border border-gray-200 text-gray-700 text-sm py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer'
            >
              <option value="relevent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400'>
              <img className='h-2' src={assets.dropdown_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10 transition-all duration-300'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          ) : (
            <div className='col-span-full py-20 text-center'>
              <p className='text-gray-400 font-medium'>No products match your filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection