import React, { useContext, useState } from 'react'
import { Outlet } from "react-router";
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContex';

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency="$"

function Layout() {

  const {token}=useContext(AdminContext);


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === "" ? <Login /> : <>
        <Header />
        <hr />
        <div className='flex'>
          <Sidebar />
          <Outlet />

        </div>
        <Footer />
      </>
      }

    </div>

  )
}

export default Layout
