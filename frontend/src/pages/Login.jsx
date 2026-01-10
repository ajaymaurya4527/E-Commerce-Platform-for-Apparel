import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShoppingCart } from "lucide-react";

function Login() {
  const [currentState, setCurrentstate] = useState("Login");
  const [loading, setLoading] = useState(false);
  const { backendUrl, accessToken, setAccessToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const endpoint = currentState === "Sign Up" ? "/user/register" : "/user/login";
      const payload = currentState === "Sign Up" ? { name, email, password } : { email, password };

      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        toast.success(response.data.message);
        setAccessToken(response.data.data.accessToken);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4 py-12'>
      <div className='flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'>

        {/* Left Side: Branding/Visual (Hidden on small screens) */}
        <div className='hidden md:flex md:w-1/2 bg-blue-300 p-12 flex-col justify-between text-white'>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-orange-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-md">
              <ShoppingCart className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-slate-800">
              MAURYA<span className="text-orange-600">SHOP</span>
            </span>
          </div>
          <div>
            <h2 className='text-5xl font-serif leading-tight'>
              {currentState === 'Login' ? 'Welcome Back.' : 'Start Your Journey.'}
            </h2>
            <p className='text-gray-400 mt-4 text-lg'>Access the latest collections and exclusive member benefits.</p>
          </div>
          <div className='flex gap-2'>
            <div className={`h-1 rounded-full transition-all duration-500 ${currentState === 'Login' ? 'w-12 bg-white' : 'w-4 bg-gray-700'}`}></div>
            <div className={`h-1 rounded-full transition-all duration-500 ${currentState === 'Sign Up' ? 'w-12 bg-white' : 'w-4 bg-gray-700'}`}></div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className='w-full md:w-1/2 p-8 sm:p-12'>
          <div className='mb-10'>
            <h3 className='text-2xl font-bold text-gray-900'>{currentState}</h3>
            <p className='text-gray-500 text-sm mt-1'>Please enter your details below.</p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-5'>
            {currentState === "Sign Up" && (
              <div className='space-y-1'>
                <label className='text-xs font-bold uppercase text-gray-400 ml-1'>Full Name</label>
                <div className='relative flex items-center'>
                  <span className='absolute left-4 text-gray-400'>👤</span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className='w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all'
                    placeholder='John Doe'
                    required
                  />
                </div>
              </div>
            )}

            <div className='space-y-1'>
              <label className='text-xs font-bold uppercase text-gray-400 ml-1'>Email Address</label>
              <div className='relative flex items-center'>
                <span className='absolute left-4 text-gray-400'>✉️</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className='w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all'
                  placeholder='hello@example.com'
                  required
                />
              </div>
            </div>

            <div className='space-y-1'>
              <div className='flex justify-between items-center'>
                <label className='text-xs font-bold uppercase text-gray-400 ml-1'>Password</label>
                <span className='text-[10px] font-bold text-gray-400 cursor-pointer hover:text-black'>FORGOT?</span>
              </div>
              <div className='relative flex items-center'>
                <span className='absolute left-4 text-gray-400'>🔒</span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className='w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all'
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className='w-full bg-black text-white py-4 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400'
            >
              {loading ? 'Processing...' : (
                <>
                  {currentState === "Login" ? "Sign In" : "Create Account"}
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className='mt-8 text-center'>
            <p className='text-gray-500 text-sm'>
              {currentState === "Login" ? "Don't have an account?" : "Already a member?"}
              <button
                onClick={() => setCurrentstate(currentState === "Login" ? "Sign Up" : "Login")}
                className='ml-2 font-bold text-black border-b-2 border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-all'
              >
                {currentState === "Login" ? "Sign Up" : "Login Now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;