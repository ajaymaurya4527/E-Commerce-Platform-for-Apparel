import React from 'react'

function NewsLatterBox() {

    const onSubmitHandler=(event)=>{
        event.preventDefault();

    }
  return (
    <div className='text-center bg-[#ecfefa]'>
        <p className='text-2xl font-medium text-gray-800 '>Suscribe Now to get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, explicabo.</p>
        <div className='mb-1'>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required />
            <button className='bg-blue-700 rounded px-8 py-3' type='submit'>Subscribe</button>

        </form>

        </div>
      
    </div>
  )
}

export default NewsLatterBox
