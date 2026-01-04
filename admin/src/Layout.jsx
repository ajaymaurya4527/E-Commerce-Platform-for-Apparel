import React, { useState } from 'react'
import { Outlet } from "react-router";
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './components/Login';



function Layout() {

  const [token, setToken] = useState("")


  return (
    <div className='bg-gray-50 min-h-screen'>
      {token === "" ? <Login /> : <>
        <Header />
        <hr />
        <Sidebar />
        <Footer />
      </>
      }

    </div>
  )
}

export default Layout
