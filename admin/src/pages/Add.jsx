import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { backendUrl } from '../Layout';
import { AdminContext } from '../context/AdminContex';
import axios from 'axios';
import { toast } from 'react-toastify';


function Add() {

  const {token,setToken}=useContext(AdminContext);


  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategoey] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
    const formData=new FormData();
    image1 && formData.append("image1",image1);
    image2 && formData.append("image2",image2);
    image3 && formData.append("image3",image3);
    image4 && formData.append("image4",image4);

    formData.append("name",name);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("category",category);
    formData.append("subCategory",subCategory);
    formData.append("sizes",JSON.stringify(sizes));
    formData.append("bestseller",bestseller);

    const response=await axios.post(backendUrl + "/product/add",formData,{headers:{token}})
    console.log(response)

    if(response.data.success){
      toast.success(response.data.message)

      setName("")
      setDiscription("")
      setPrice("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
    }else{
      toast.error(response.data.message)
    }

      
    } catch (error) {

      toast.error(error)
      
    }

  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-8 p-6 bg-white rounded-lg shadow-sm max-w-4xl'>

      {/* Upload Section */}
      <div className='w-full'>
        <p className='mb-3 font-medium text-gray-700'>Upload Product Images</p>
        <div className='flex gap-3'>

          {/* Image 1 */}
          <label htmlFor="image1" className="cursor-pointer group">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 group-hover:border-black transition-colors">
              <img className='w-22 h-22 opacity-80 group-hover:opacity-100 transition-opacity' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            </div>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2" className="cursor-pointer group">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 group-hover:border-black transition-colors">
              <img className='w-22 h-22 opacity-80 group-hover:opacity-100 transition-opacity' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            </div>
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3" className="cursor-pointer group">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 group-hover:border-black transition-colors">
              <img className='w-22 h-22 opacity-80 group-hover:opacity-100 transition-opacity' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            </div>
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4" className="cursor-pointer group">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 group-hover:border-black transition-colors">
              <img className='w-22 h-22 opacity-80 group-hover:opacity-100 transition-opacity' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            </div>
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>

        </div>
      </div>

      {/* Basic Info Section */}
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full'>
          <p className='mb-2 font-medium text-gray-700'>Product Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black' type="text" placeholder='Ex: Slim Fit Cotton Shirt' />
        </div>

        <div className='w-full'>
          <p className='mb-2 font-medium text-gray-700'>Product Description</p>
          <textarea onChange={(e)=>setDiscription(e.target.value)} value={description} className='w-full max-w-[500px] px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black' rows={3} placeholder='Describe the product features...' />
        </div>
      </div>

      {/* Categories and Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-10'>
        <div className='flex-1'>
          <p className='mb-2 font-medium text-gray-700'>Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-4 py-2.5 border border-gray-300 rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-black'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 font-medium text-gray-700'>Sub Category</p>
          <select onChange={(e)=>setSubcategoey(e.target.value)} className='w-full px-4 py-2.5 border border-gray-300 rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-black'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 font-medium text-gray-700'>Price</p>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>$</span>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-8 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black' type="Number" placeholder='25' />
          </div>
        </div>
      </div>

      {/* Product Sizes */}
      <div className='w-full'>
  <p className='mb-3 font-medium text-gray-700'>Available Sizes</p>
  <div className='flex gap-3'>

    {/* Size S */}
    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
      <p className={`px-4 py-2 rounded-md cursor-pointer transition-all border ${sizes.includes("S") ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-slate-200"}`}>
        S
      </p>
    </div>

    {/* Size M */}
    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
      <p className={`px-4 py-2 rounded-md cursor-pointer transition-all border ${sizes.includes("M") ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-slate-200"}`}>
        M
      </p>
    </div>

    {/* Size L */}
    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
      <p className={`px-4 py-2 rounded-md cursor-pointer transition-all border ${sizes.includes("L") ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-slate-200"}`}>
        L
      </p>
    </div>

    {/* Size XL */}
    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
      <p className={`px-4 py-2 rounded-md cursor-pointer transition-all border ${sizes.includes("XL") ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-slate-200"}`}>
        XL
      </p>
    </div>

    {/* Size XXL */}
    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
      <p className={`px-4 py-2 rounded-md cursor-pointer transition-all border ${sizes.includes("XXL") ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-slate-200"}`}>
        XXL
      </p>
    </div>

  </div>
</div>

      {/* Bestseller Checkbox */}
      <div className='flex items-center gap-2 cursor-pointer'>
        <input onChange={()=>setBestSeller(prev => !prev)} type="checkbox" checked={bestseller} id='bestseller' className='w-4 h-4 accent-black cursor-pointer' />
        <label className='cursor-pointer text-gray-700 select-none' htmlFor="bestseller">Add to Bestseller collection</label>
      </div>

      <button className='bg-black text-white px-10 py-3 rounded-md font-semibold hover:bg-gray-800 active:scale-95 transition-all' type='submit'>
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Add;