"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const [token,setToken]=useState('');
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);
 // Hook for accessing the router
    useEffect(() => {
        // Extract the token from the URL query parameters using window.location
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');  // Get the token from the URL query params
        if (tokenFromUrl) {
            setToken(tokenFromUrl);  // Update the token state
        }
    }, []);  // Runs only once after the component mounts
    useEffect(() =>{
        const verifyEmail = async ()=>{
        try {
            await axios.post('/api/user/verifyemail',{token})
            setVerified(true)
        } catch (error:any) {
            toast.error(error)
            console.log(error)
            setError(true)
        }}
        if (token){
            verifyEmail()
        }
    },[token])
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
)
}

export default VerifyEmail