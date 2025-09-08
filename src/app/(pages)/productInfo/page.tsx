"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";


export default function ProductInfo() {
  const image3 =
    "https://plus.unsplash.com/premium_photo-1688497831503-235238709bd2?q=80&w=378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const image4 =
    "https://plus.unsplash.com/premium_photo-1688497830987-e4f7ce4da50b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const image5 =
    "https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D";

  const productinfor = {
    title: "Men Round Neck Pure Cotton T-shirt",
    price: 999,
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  };

  const images = [image5, image4, image3];
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-white text-black">
      <Navbar />
      <div className="flex gap-6 p-6 ">
        {/* product images part */}
        <div className=" flex-1">
          <div className=" flex p-3">
            {/* Thumbnail images */}
            <div className="flex ml-6 flex-col gap-2">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`thumb-${index}`}
                  height={100}
                  width={100}
                  className={`border-1 border-black object-cover rounded cursor-pointer border-2 ${
                    image === mainImage ? "border-gray-700" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
            {/* Main image */}
            <div className=" flex-1 flex ml-3">
              <Image
                src={mainImage}
                alt="main product"
                height={300}
                width={300}
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>
        {/* product information part */}
        <div className="flex-1 w-[150px] p-7  space-y-10">
          <h1 className="text-4xl epunda-slab-medium">{productinfor.title}</h1>
          <p className="text-3xl epunda-slab-light ">₹{productinfor.price}</p>
          <p className="epunda-slab-light leading-relaxed">
            {productinfor.description}
          </p>
          <button className="w-full bg-black text-white py-2 rounded-lg cursor-pointer hover:bg-gray-800">
            Add to Cart
          </button>
          <p className="text-sm epunda-slab-light text-gray-500 leading-relaxed">
            100% Original product <br />
            Free delivery on orders above ₹49 <br />
            Easy return and exchange policy within 7 days
          </p>
        </div>
      </div>


      {/* Tabs: Description | Reviews */}
      <div className="px-6 p-4 m-9 pb-12">
        <div className=" ">
          {/* Tab headers */}
          <div className="flex ">
            <div
              className="px-6 py-3 text-sm md:text-base border-t border-l border-gray-300 epunda-slab-medium transition-colors "
            >
              Description
            </div>
            <div
              className="px-6 py-3 text-sm md:text-base border-t border-r border-l border-gray-300 epunda-slab-medium transition-colors text-gray-600"
            >
              Reviews (122)
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 border border-gray-300">
              <div className="space-y-4 text-gray-700 epunda-slab-light  leading-relaxed p-3 m-3">
                <p>
                  An e-commerce website is an online platform that facilitates
                  the buying and selling of products or services over the
                  internet. It serves as a virtual marketplace where businesses
                  and individuals showcase their products, interact with
                  customers, and conduct transactions without the need for a
                  physical presence.
                  E-commerce websites have gained immense popularity due to
                  their convenience, accessibility, and the global reach they
                  offer.
                </p>
                <p>
                  E-commerce websites typically display products or services
                  along with detailed descriptions, images, prices, and any
                  available variations (e.g., sizes, colors). Each product
                  usually has its own dedicated page with relevant information.
                </p>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
