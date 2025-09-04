import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
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
            <a
              href="#"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              HOME
            </a>
          </li>
          <li className="relative">
            <a
              href="#"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              COLLECTION
            </a>
          </li>
          <li className="relative">
            <a
              href="#"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              ABOUT US
            </a>
          </li>
          <li className="relative">
            <a
              href="#"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </div>
      <div className="epunda-slab-medium  flex flex-row gap-2">
        <ul className="flex space-x-7">
          <li className="relative">
            <a
              href="auth/login"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              SIGN IN
            </a>
          </li>
          <li className="relative">
            <a
              href="auth/register"
              className="text-gray-700 font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              SIGN UP
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
