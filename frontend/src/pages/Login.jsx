import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {

  const [currentState, setCurrentstate] = useState("Login")

  const { backendUrl, accessToken, setAccessToken, navigate } = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/user/register", { name, email, password })
        console.log(response)
        if (response.data.success) {
          localStorage.setItem("accessToken",response.data.data.accessToken)
          toast.success(response.data.message)
          setAccessToken(response.data.data.accessToken)
          
          
          
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(backendUrl + "/user/login", { email, password })
        if (response.data.success) {
          localStorage.setItem("accessToken",response.data.data.accessToken)
          toast.success(response.data.message)
          setAccessToken(response.data.data.accessToken)
          
  
        } else {
          toast.error(response.data.message)
        }

      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(()=>{
        if(accessToken){
          navigate("/")
        }

      },[accessToken])



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800 mb-10'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "Login" ? "" : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === "Login"
            ? <p onClick={() => setCurrentstate("Sign Up")} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentstate("Login")} className='cursor-pointer'>Login</p>
        }
      </div>
      <button className='cursor-pointer bg-black text-white py-2 px-8 font-light mt-4'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>

    </form>
  )
}

export default Login
