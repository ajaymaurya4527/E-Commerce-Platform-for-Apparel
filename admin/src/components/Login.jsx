import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Main Card Container */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding/Visual */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 text-white flex-col justify-between">
          <div>
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center mb-6">
              <div className="h-6 w-6 bg-indigo-600 rounded-sm" />
            </div>
            <h2 className="text-3xl font-bold leading-tight">
              Manage your <br /> Enterprise Portal.
            </h2>
            <p className="mt-4 text-indigo-100">
              The central hub for your team's analytics and project management.
            </p>
          </div>
          <div className="text-sm text-indigo-200">
            © 2026 AdminCore Inc.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Please enter your admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  placeholder="admin@company.com"
                  onChange={(e) =>setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors group"
            >
              Sign in to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Need help? <a href="#" className="font-semibold text-indigo-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;