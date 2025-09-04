"use client"
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import rightSideImage from "../../public/RightSideImage.jpg";
import exchangeLogo from "../../public/exchangeLogo.png";
import returnLogo from "../../public/returnlogo.png";
import policyLogo from "../../public/policylogo.png";
import Footer from "../components/Footer";
import gsap from "gsap";
import {useEffect , useRef} from "react";
import ProductCard from "@/components/productCard";
import TextPlugin from 'gsap/TextPlugin';


gsap.registerPlugin(TextPlugin)

export default function Home() {


  const textRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(textRef.current){
      gsap.fromTo(textRef.current,
      {
        text:""
      },
    {
      text:"––– The Gents Edit",
      duration:3,
      ease:"none",
      delay:0.3,
      
    })
    }
    if(descRef.current){
      gsap.fromTo(descRef.current,
      {
        text:""
      },
    {
      text:" where sophistication meets everyday wear –––––",
      duration:3,
      ease:"none",
      delay:3,
      
    })
    }
  },[])

  return (
    <div className="bg-white">
      <Navbar />
      {/* yeh landing page ka front wala image and text h */}
      <div className="bg-white p-9 mb-3 ">
        <div className="border-3 bg-[#f5f2e9] border-black flex items-center justify-between">
          <div className="flex-1  text-black flex-col justify-center items-center">
            <h1 ref={textRef} className="text-4xl epunda-slab-medium  text-center "></h1>

            <p ref={descRef} className="text-center epunda-slab-medium ">
             
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

      {/* latest wala section */}
      <div className="bg-white text-black mt-12 mb-9  ">
        <div className="flex flex-col justify-center mb-8 text-center">
          <h1 className=" text-3xl epunda-slab-medium">
            LATEST <span className="text-gray-700">COLLECTIONS</span>
          </h1>
          <h2 className="text-gray-700">
            Fresh Styles, New Trends – Explore Our Latest Collections!
          </h2>
        </div>
        <ProductCard />
      </div>

      {/* best seller wala section */}
      <div className="bg-white text-black mt-12 ">
        <div className="flex flex-col justify-center mb-8 text-center">
          <h1 className=" text-3xl epunda-slab-medium">
            BEST <span className="text-gray-700">SELLER</span>
          </h1>
          <h2>Most Loved, Most Wanted – Shop Our Best Sellers!</h2>
        </div>
        <ProductCard />
      </div>

      {/* triple sextions */}
      <div className="mt-24 m-24 mb-34 ">
        <div className="flex flex-col-3 justify-between mb-8 p-8 gap-8  text-center">
          <div className="flex flex-col items-center justify-center">
            <Image src={exchangeLogo} alt="image" width={50} height={50} />
            <p className="text-2xl epunda-slab-medium text-gray-800">
              Easy Exchange Policy
            </p>
            <p className="text-gray-600">
              We offer hassle free Exchanging policy
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src={returnLogo} alt="image" width={50} height={50} />
            <p className="text-2xl epunda-slab-medium text-gray-800">
              7 Days Return Policy
            </p>
            <p className="text-gray-600">
              We Provides 7 Days free return Policy.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src={policyLogo} alt="image" width={40} height={40} className="mb-1" />
            <p className="text-2xl epunda-slab-medium text-gray-800">
              Easy Exchange Policy
            </p>
            <p className="text-gray-600">
              We offer hassle free Exchanging policy
            </p>
          </div>
        </div>
      </div>


      <Footer/>


    </div>
  );
}
