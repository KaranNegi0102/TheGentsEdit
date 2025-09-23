"use client";
import React from "react";
// import { useAppSelector } from "@/app/hooks/hooks";
import { ShoppingBag } from "lucide-react";
import model from "../../public/model.jpg";
import Image from "next/image";

const LandingProduct = () => {
  // const { products } = useAppSelector((state) => state.products);
  // console.log("this is my products", products);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full px-8 py-12">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="col-span-4 space-y-6">
            <div>
              <h1 className="text-5xl font-serif text-black mb-6 leading-tight">
                Trendy Outfit
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-xs">
                Contrary to popular belief, lorem ipsum is not simply random
                text. It has roots in a piece of classical latin literature from
                45 bc
              </p>
            </div>

            <button className="bg-gray-900 text-white px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
              Shop Now
              <ShoppingBag size={16} />
            </button>
          </div>

          {/* Center Model Image with Dark Circle */}
          <div className="col-span-4 relative flex justify-center">
            {/* Dark circular background */}
            {/* <div className="w-80 h-80 bg-gray-900 rounded-full absolute top-2/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> */}

            {/* Model figure - positioned to show full body */}
            <div className="relative z-10 flex justify-center">
              <div className="w-80 h-120 b  flex flex-col items-center justify-end text-white text-xs p-4 rounded-sm">
                <Image
                  src={model}
                  alt="model"
                  height={200}
                  width={200}
                  className="object-cover h-full w-full"
                ></Image>
              </div>
            </div>
          </div>

          {/* Right New Collection */}
          <div className="col-span-4 flex justify-start">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif text-black">New Collection</h2>
              <div className="relative inline-block">
                <span className="text-3xl font-light text-black">50% Off</span>
                {/* Red strike-through line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingProduct;
