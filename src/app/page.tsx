import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import rightSideImage from "../../public/RightSideImage.jpg";

import ProductCard from "@/components/productCard";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      {/* yeh landing page ka front wala image and text h */}
      <div className="bg-white p-9 mb-3 ">
        <div className="border-3 bg-[#f5f2e9] border-black flex items-center justify-between">
          <div className="flex-1  text-black flex-col justify-center items-center">
            <h1 className="text-4xl epunda-slab-medium  text-center ">
              &quot;The Gents Edit&quot;
            </h1>

            <p className="text-center epunda-slab-medium ">
              where sophistication meets everyday wear
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={rightSideImage}
              alt="image"
              width={500}
              height={500}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-white text-black mt-12 mb-9  ">
        <div className="flex flex-col justify-center mb-8 text-center">
          <h1 className=" text-3xl epunda-slab-medium">LATEST <span className="text-gray-700">COLLECTIONS</span></h1>
          <h2 className="text-gray-700" >Fresh Styles, New Trends – Explore Our Latest Collections!</h2>
        </div>
        <ProductCard/>
      </div>

      <div className="bg-white text-black mt-12 ">
        <div className="flex flex-col justify-center mb-8 text-center">
          <h1 className=" text-3xl epunda-slab-medium">BEST <span className="text-gray-700">SELLER</span></h1>
          <h2>Most Loved, Most Wanted – Shop Our Best Sellers!</h2>
        </div>
        <ProductCard/>
      </div>
    </div>
  );
}
