"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleFetchingUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/me");
      setData(response.data.user._id);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Profile Page</h1>
        
        {/* User ID Display */}
        <p className="text-gray-700 text-lg mb-4">
          User ID:{" "}
          {data ? (
            <Link href={`/profile/${data}`} className="text-blue-600 hover:underline">
              {data}
            </Link>
          ) : (
            <span className="text-red-500">No Data</span>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleFetchingUserData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Fetching..." : "Get User Data"}
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
