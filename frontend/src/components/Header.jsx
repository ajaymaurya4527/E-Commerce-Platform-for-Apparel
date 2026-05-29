import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ShopContext } from "../context/ShopContext.jsx";

import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import axios from "../utils/axios.js";

function Header() {

  const [visible, setVisible] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [userName, setUserName] = useState("");



  const {
    setShowSearch,
    getCartCount,
    accessToken,
    navigate,
    setAccessToken,
    setCartItem,
  } = useContext(ShopContext);



  // FETCH USER NAME
  const fetchUserName = async () => {

    try {

      const response = await axios.post(
        "/user/username",
        { names: "ajay" }
      );

      if (response.data.success) {

        const firstName = response.data.name.split(" ")[0];

        setUserName(firstName);

      }

    } catch (error) {

      console.error(error);

    }
  };



  useEffect(() => {

    if (accessToken) {

      fetchUserName();

    } else {

      setUserName("");

    }

  }, [accessToken]);



  // LOGOUT
  const logout = () => {

    setAccessToken("");

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    setCartItem({});

    setUserName("");

    navigate("/login");
  };



  // NAV STYLE
  const navLinkStyles = ({ isActive }) =>
    `relative py-1 text-sm lg:text-base transition-all duration-300 font-medium ${
      isActive
        ? "text-orange-600 after:w-full"
        : "text-gray-700 hover:text-orange-600 after:w-0"
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300`;



  return (

    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <nav className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        <div className="flex justify-between items-center h-16 sm:h-20">



          {/* LOGO */}
          <Link to="/" className="flex items-center group flex-shrink-0">

            <div className="flex items-center gap-2 sm:gap-3">

              <div className="bg-orange-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-md">

                <ShoppingCart className="text-white w-4 h-4 sm:w-5 sm:h-5" />

              </div>

              <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-slate-800">

                MAURYA
                <span className="text-orange-600">SHOP</span>

              </span>

            </div>

          </Link>



          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8">

            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>

            <NavLink to="/collection" className={navLinkStyles}>
              Collection
            </NavLink>

            <NavLink to="/about" className={navLinkStyles}>
              About
            </NavLink>

            <NavLink to="/contactus" className={navLinkStyles}>
              Contact Us
            </NavLink>

          </ul>



          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-4">



            {/* SEARCH */}
            <Link to="/collection">

              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all"
              >

                <Search className="w-5 h-5" />

              </button>

            </Link>



            {/* PROFILE */}
            <div className="relative">

              <div
                onClick={() => {

                  if (!accessToken) {

                    navigate("/login");

                  } else {

                    setProfileOpen(!profileOpen);

                  }
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-transparent hover:border-orange-100 hover:bg-orange-50/50 rounded-full transition-all cursor-pointer"
              >

                <div className="bg-slate-100 p-1.5 rounded-full">

                  <User className="w-4 h-4 text-slate-600" />

                </div>



                {accessToken && userName && (

                  <div className="hidden sm:flex flex-col items-start leading-tight">

                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">

                      Account

                    </span>

                    <span className="text-sm font-bold text-slate-800 whitespace-nowrap">

                      {userName}

                    </span>

                  </div>

                )}

              </div>



              {/* PROFILE DROPDOWN */}
              {accessToken && profileOpen && (

                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 overflow-hidden z-50">

                  <div className="px-4 py-3 bg-slate-50/50 border-b border-gray-50 mb-1">

                    <p className="text-xs text-slate-500">

                      Logged in as

                    </p>

                    <p className="text-sm font-bold text-slate-800 truncate">

                      {userName}

                    </p>

                  </div>



                  <button
                    onClick={() => {

                      navigate("/profile");

                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                  >

                    <User size={14} />
                    My Profile

                  </button>



                  <button
                    onClick={() => {

                      navigate("/orders");

                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                  >

                    <ChevronRight size={14} />
                    Orders

                  </button>



                  <hr className="my-1 border-gray-50" />



                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >

                    Logout

                  </button>

                </div>

              )}

            </div>



            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-all"
            >

              <ShoppingCart className="w-5 h-5" />

              <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-orange-600 text-white font-bold rounded-full text-[10px]">

                {getCartCount()}

              </span>

            </Link>



            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setVisible(true)}
              className="md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
            >

              <Menu className="w-6 h-6" />

            </button>

          </div>

        </div>



        {/* MOBILE SIDEBAR */}
        <div
          onClick={() => setVisible(false)}
          className={`fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            visible
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
              visible
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >

            <div className="flex flex-col h-full">



              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-green-100">

                <span className="font-bold text-gray-800 uppercase tracking-widest text-sm">

                  Navigation

                </span>

                <button
                  onClick={() => setVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >

                  <X className="w-5 h-5" />

                </button>

              </div>



              {/* MOBILE NAV LINKS */}
              <div className="flex flex-col bg-gray-600">

                {[
                  { path: "/", label: "Home" },
                  { path: "/collection", label: "Collection" },
                  { path: "/about", label: "About" },
                  { path: "/contactus", label: "Contact Us" },
                ].map((item) => (

                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-6 py-5 border-b border-gray-100 text-base font-semibold ${
                        isActive
                          ? "bg-orange-50 text-orange-600 border-l-4 border-l-orange-600"
                          : "text-gray-700"
                      }`
                    }
                  >

                    <span>{item.label}</span>

                    <ChevronRight
                      size={18}
                      className="opacity-60"
                    />

                  </NavLink>

                ))}

              </div>



              {/* FOOTER */}
              <div className="mt-auto p-6 bg-gray-50">

                <p className="text-xs text-gray-400 text-center">

                  © 2026 MAURYA SHOP

                </p>

              </div>

            </div>

          </div>

        </div>

      </nav>

    </header>
  );
}

export default Header;