"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { fetchUserData , logout } from "@/app/redux/slices/authSlice";
import Link from "next/link";
import { toast } from 'react-hot-toast';


export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoggedIn, userData } = useAppSelector(
    (state) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    if (userData) {
      setEditForm({
        name: userData.name || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast("Log Out Successful",{
        icon:'☑️',
        position:'top-right',
        style:{
          background:"black",
          color:"white"
        }
      })
      dispatch(logout());
      router.push("/");
    } catch (error) {
      toast("Log Out Failed",{
        icon:'❌',
        position:'top-right',
        style:{
          background:"black",
          color:"white"
        }
      })
      console.log(error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // console.log("saving changes", editForm);
      const res = await axios.put("/api/updateProfile", editForm, {
        withCredentials: true,
      });
      if(res.data.success){
        // console.log(res)
        toast("Changes Saved",{
          icon:'☑️',
          position:'top-right',
          style:{
            background:"black",
            color:"white"
          }
        })
        dispatch(fetchUserData());
        setEditForm(res.data.userData);
        setIsEditing(false);
        // alert("profile updated")
      }
      else{
        toast("Changes Not Saved",{
          icon:'❌',
          position:'top-right',
          style:{
            background:"black",
            color:"white"
          }
        })
        // alert("profile not updated")
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (userData) {
      setEditForm({
        name: userData.name || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        address: userData.address || "",
      });
    }
    setIsEditing(false);
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#f5f2e9] flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F4F4D] mx-auto mb-4"></div>
  //         <p className="epunda-slab-light text-[#4F4F4D]">Loading profile...</p>
  //       </div>
  //     </div>
  //   );
  // }


  // jab middleware lagega tab yeh hata dunga
  if (!isLoggedIn || !userData) {
    return (
      <div className="min-h-screen bg-[#f5f2e9] flex items-center justify-center">
        <div className="text-center">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h1 className="epunda-slab-medium text-2xl text-[#4F4F4D] mb-4">
            Please sign in to view your profile
          </h1>
          <button
            onClick={() => router.push("/")}
            className="epunda-slab-medium bg-[#4F4F4D] text-white px-6 py-2 rounded hover:bg-[#3a3a38] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <div className="bg-white mt-16 shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="epunda-slab-medium text-3xl text-gray-700">
                Profile
              </h1>
              <p className="epunda-slab-light text-gray-500 mt-1">
                Manage your account information
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="epunda-slab-medium bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border text-gray-700 border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <span className="epunda-slab-medium text-2xl text-[#4F4F4D]">
                    {userData.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="epunda-slab-medium text-2xl">
                    {userData.name || "User"}
                  </h2>
                  <p className="epunda-slab-light text-gray-200">
                    {userData.role || "Customer"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="epunda-slab-medium bg-white text-[#4F4F4D] px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="epunda-slab-medium text-xl text-[#4F4F4D] border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4F4F4D] focus:border-transparent"
                    />
                  ) : (
                    <p className="epunda-slab-light text-[#4F4F4D] py-2">
                      {userData.name || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4F4F4D] focus:border-transparent"
                    />
                  ) : (
                    <p className="epunda-slab-light text-[#4F4F4D] py-2">
                      {userData.email || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone_number"
                      value={editForm.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4F4F4D] focus:border-transparent"
                    />
                  ) : (
                    <p className="epunda-slab-light text-[#4F4F4D] py-2">
                      {userData.phone_number || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="epunda-slab-medium text-xl text-[#4F4F4D] border-b border-gray-200 pb-2">
                  Address Information
                </h3>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4F4F4D] focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="epunda-slab-light text-[#4F4F4D] py-2">
                      {userData.address || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Account Type
                  </label>
                  <p className="epunda-slab-light text-[#4F4F4D] py-2 capitalize">
                    {userData.role || "Customer"}
                  </p>
                </div>

                <div>
                  <label className="epunda-slab-light text-sm text-gray-600 block mb-1">
                    Member Since
                  </label>
                  <p className="epunda-slab-light text-[#4F4F4D] py-2">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCancelEdit}
                  className="epunda-slab-medium cursor-pointer bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="epunda-slab-medium bg-[#4F4F4D] cursor-pointer text-white px-6 py-2 rounded hover:bg-[#3a3a38] transition-colors"
                >
                  {saving ? (
                    "Saving......"
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/orders">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="epunda-slab-medium text-lg text-[#4F4F4D] mb-2">
              Order History
            </h3>
            <p className="epunda-slab-light text-gray-600 text-sm">
              View your past orders
            </p>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/Wishlist">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="epunda-slab-medium text-lg text-[#4F4F4D] mb-2">
                Wishlist
            </h3>
            <p className="epunda-slab-light text-gray-600 text-sm">
              Your saved items
            </p>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/AboutUs">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="epunda-slab-medium text-lg text-[#4F4F4D] mb-2">
                Support
            </h3>
            <p className="epunda-slab-light text-gray-600 text-sm">
            Get help and support
            </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
