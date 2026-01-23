import React, { useContext, useState } from 'react';
import { User, Package, LogOut, Camera, Lock, CheckCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Myprofile = () => {
  const { navigate, setAccessToken, setCartItem,  backendUrl, accessToken } = useContext(ShopContext);

  // State for user details
  const [userData, setUserData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.j@example.com' // Keeping email static or editable as needed
  });

  // State for password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    setUserData(prev => ({ ...prev, fullName: e.target.value }));
  };

  const updateName = () => {
    // Add API logic to update name
    console.log("Updating name to:", userData.fullName);
    alert("Name updated successfully!");
  };

  const updatePassword = async () => {
    

    try {
      const { currentPassword, newPassword } = passwordData;
      let data = {
        oldPassword: currentPassword,
        newPassword: newPassword
      }
      const response = await axios.post(
        backendUrl + "/user/change-password",
        data,
        { headers: { accessToken } }
      );
      if(response.data?.success){
        toast.success(response.data.message);
      setPasswordData({ currentPassword: '', newPassword: '' });
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  };

  const logout = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    setCartItem({});
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white rounded-2xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYvq7zWeYgf2yDxPRExBk-l4hhCzk6FyhWA&s"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-indigo-50"
              />
              <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="mt-4 font-bold text-gray-800 text-lg">{userData.fullName}</h2>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-600">
              <User size={20} /> Personal Info
            </button>
            <button onClick={() => navigate("/orders")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
              <Package size={20} /> My Orders
            </button>
            <hr className="my-4 border-gray-100" />
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition">
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">

          {/* Section 1: Basic Info & Name Update */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Account Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={userData.fullName}
                  onChange={handleUserChange}
                  className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-indigo-600 transition bg-transparent text-gray-800 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                <p className="text-gray-400 font-medium border-b border-gray-50 py-2 cursor-not-allowed">{userData.email}</p>
              </div>

              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  onClick={updateName}
                  className="flex items-center gap-2 px-8 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all active:scale-95"
                >
                  Update Name
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Password Security Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-indigo-50">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={20} className="text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Security & Password</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-indigo-600 transition bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-indigo-600 transition bg-transparent"
                />
              </div>

              <div className="md:col-span-2 flex justify-center mt-8">
                <button
                  onClick={updatePassword}
                  className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Myprofile;