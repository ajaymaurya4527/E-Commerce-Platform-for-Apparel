import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contact() {

    const {backendUrl,accessToken}=useContext(ShopContext);

    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [message,setMessage]=useState("")

    const onSubmitHandler=async (e)=>{
        e.preventDefault();

        try {
            if(accessToken){
                const response=await axios.post(backendUrl + "/contact/contact-us",{fullName,email,phone,message},{headers:{accessToken}})
                toast.success(response.data.messages)
                console.log(response);
            }else{
                toast.error("Please Login First")
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        
    }



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl w-full">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <span className="text-orange-600 font-bold tracking-widest uppercase text-xs sm:text-sm">Get in touch</span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
                        Namaste! <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Let’s Talk.</span>
                    </h1>
                    <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Whether you have a project in mind or just want to say hi, our team in Nallasopara is ready to help.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100/50 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left Panel: Contact Info */}
                    <div className="lg:col-span-5 bg-[#0f172a] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Indian-inspired Pattern Overlay (Subtle) */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        
                        {/* Decorative Saffron Glow */}
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-600/30 rounded-full blur-[100px]"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
                                Contact Details
                                <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
                            </h2>
                            
                            <div className="space-y-10">
                                {/* Address */}
                                <div className="flex items-start gap-5 group">
                                    <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-orange-600 transition-all duration-300 shadow-lg">
                                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-orange-400 text-xs uppercase font-black tracking-widest">Our Office</p>
                                        <p className="text-sm sm:text-base mt-1 text-slate-300 leading-relaxed">
                                            Gorai Naka, Santosh Bhuvan,<br/>Nallasopara(E), Mumbai, MH
                                        </p>
                                    </div>
                                </div>

                                {/* Phone & WhatsApp */}
                                <div className="flex items-start gap-5 group">
                                    <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-green-600 transition-all duration-300 shadow-lg">
                                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-orange-400 text-xs uppercase font-black tracking-widest">Call / WhatsApp</p>
                                        <p className="text-sm sm:text-base mt-1 text-slate-300">+91 90213 37316</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-5 group">
                                    <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-blue-500 transition-all duration-300 shadow-lg">
                                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                                    </div>
                                    <div className="break-all">
                                        <p className="text-orange-400 text-xs uppercase font-black tracking-widest">Drop an Email</p>
                                        <p className="text-sm sm:text-base mt-1 text-slate-300">ajaymaurya1725@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm relative z-10">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-4 tracking-widest">Connect on Social</p>
                            <div className="flex gap-4">
                                {['LinkedIn', 'Twitter', 'Insta'].map((item) => (
                                    <button key={item} className="px-4 py-2 bg-slate-800 hover:bg-orange-600 rounded-lg text-xs font-bold transition-all">
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Form */}
                    <div className="lg:col-span-7 p-8 sm:p-12">
                        <form onSubmit={onSubmitHandler}  className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                    <input
                                        onChange={(e)=>setFullName(e.target.value)}
                                        value={fullName}
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 focus:border-orange-500 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                    <input
                                        onChange={(e)=>setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        placeholder="email@provider.com"
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 focus:border-orange-500 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mobile Number</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r pr-3">+91</span>
                                    <input
                                        onChange={(e)=>setPhone(e.target.value)}
                                        value={phone}
                                        type="tel"
                                        placeholder="00000 00000"
                                        className="w-full pl-16 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 focus:border-orange-500 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">How can we help?</label>
                                <textarea
                                    onChange={(e)=>setMessage(e.target.value)}
                                    value={message}
                                    rows="4"
                                    placeholder="Tell us about your project..."
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 focus:border-orange-500 focus:bg-white transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm"
                                >
                                    Send Inquiry
                                </button>
                                
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* Subtle Footer Trust Tag */}
                <p className="text-center text-slate-400 text-xs mt-8">
                    © 2026 Maurya Studio. Serving clients across Bharat.
                </p>
            </div>
        </div>
    );
}