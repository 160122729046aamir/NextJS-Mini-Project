"use client"
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
    const route = useRouter()
    const [user,setUser] = useState({
        "username":'',
        "email":'',
        "password":''
    })
    const handleSignup = async (e: React.FormEvent) =>{
      e.preventDefault();
        try {
          await axios.post('/api/user/signup',user);
          toast.success("SignUp Successfull!")
          route.push('/login')
        } catch (error:any) {
          console.log("error in signup page: ",error.message);
          toast.error(error.response?.data?.message || "Signup failed.");
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">SignUp</h2>
        <form onSubmit={handleSignup}>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              id="username"
              value={user.username}
              onChange={(e)=>setUser((userData)=>({...userData,username:e.target.value}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e)=>setUser((userData)=>({...userData,email:e.target.value}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e)=>setUser((userData)=>({...userData,password:e.target.value}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
