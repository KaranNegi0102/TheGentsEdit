"use client";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { ShoppingCart , User } from "lucide-react";

import { useAppSelector } from "@/app/hooks/hooks";
// import { fetchUserData } from "@/app/redux/slices/authSlice";

export default function Navbar() {
  // const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  console.log("this is in navbar", items);

  // noteee-----------------------------------------------------------------------
  // the part below i did for testing and for checking for my product slice output nothing important and am not removing it so that if i see the code later i can remember why i did this stupidiy Thank you for understanding
  // const { products, status } = useAppSelector((state) => state.products);

  // console.log("this is my products",products)
  // console.log("this is my products status",status)

  // console.log("isLoggedIn check in navabr", isLoggedIn);

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [dispatch]);
  // note-----------------------------------------------------------------------------

  const [openModal, setOpenModal] = useState<"login" | "register" | null>(null);

  return (
    <>
      <div className="flex flex-row text-[#4F4F4D] bg-[#f5f2e9] justify-between items-center p-4">
        <div>
          <Image
            src={logo}
            alt="logo"
            width={250}
            height={250}
            className="mt-1"
          />
        </div>
        <div className="epunda-slab-medium flex flex-row gap-2">
          <ul className="flex space-x-7">
            <li className="relative">
              <Link
                href="/"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-7.5 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                HOME
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/collection"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-22 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                COLLECTION
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/AboutUs"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-15 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
        <div className="epunda-slab-medium mr-8 flex flex-row gap-2">
          <ul className="flex space-x-7 ">
            {isLoggedIn ? (
              <>
                <li className="relative">
                  <Link
                    href="/Profile"
                    className="text-gray-700  font-bold hover:text-white"
                  >
                    <User size={28} className="hover:bg-gray-700 hover:rounded-md "/>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="/Cart"
                    className="text-gray-700 font-bold relative"
                  >
                    <ShoppingCart size={28}  />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {items.length}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="relative">
                  <a
                    onClick={() => {
                      setOpenModal("login");
                    }}
                    className="text-gray-700 font-bold cursor-pointer after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-11 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    SIGN IN
                  </a>
                </li>
                <li className="relative">
                  <a
                    onClick={() => {
                      setOpenModal("register");
                    }}
                    className="text-gray-700 font-bold cursor-pointer after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-11 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    SIGN UP
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* yaha par modal ka hoga */}
      <AuthModal
        isOpen={!!openModal}
        type={openModal || "login"}
        onClose={() => setOpenModal(null)}
        onTypeChange={(newType) => setOpenModal(newType)}
      />
    </>
  );
}
