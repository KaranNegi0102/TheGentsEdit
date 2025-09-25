"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
// import rightSideImage from "../../public/RightSideImage.jpg";
import exchangeLogo from "../../public/exchangeLogo.png";
import returnLogo from "../../public/returnlogo.png";
import policyLogo from "../../public/policylogo.png";
import model from "../../public/landingPage.png";

import Footer from "../components/Footer";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import ProductCard from "@/components/productCard";
import TextPlugin from "gsap/TextPlugin";
// import { useAppSelector } from "@/app/hooks/hooks";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function Home() {
  const textRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const descRef2 = useRef<HTMLDivElement>(null);
  const arrivalsRef = useRef<HTMLDivElement>(null);
  const arrivalsRef2 = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsRef2 = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // const { products } = useAppSelector((state) => state.products);



  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Timeout for loader (e.g., 3 seconds)
    const timer = setTimeout(() => {
      // setLoading(false);
      document.body.style.overflow = "auto"; // unlock scroll
      ScrollTrigger.refresh(); // recalc triggers after DOM is visible
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          text: "",
        },
        {
          text: "––– The Gents Edit",
          duration: 3,
          ease: "none",
          delay: 0.3,
        }
      );
    }
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        {
          text: "",
        },
        {
          text: " where sophistication meets everyday wear –––––",
          duration: 3,
          ease: "none",
          delay: 3,
        }
      );
    }
    if (textRef2.current) {
      gsap.fromTo(
        textRef2.current,
        {
          text: "",
        },
        {
          text: "––– The Gents Edit",
          duration: 3,
          ease: "none",
          delay: 0.3,
        }
      );
    }
    if (descRef2.current) {
      gsap.fromTo(
        descRef2.current,
        {
          text: "",
        },
        {
          text: " where sophistication meets everyday wear –––––",
          duration: 3,
          ease: "none",
          delay: 3.4,
        }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 4,
        },
        { opacity: 1, scale: 1, duration: 6.2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (arrivalsRef.current) {
      gsap.fromTo(
        arrivalsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: arrivalsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (arrivalsRef2.current) {
      gsap.fromTo(
        arrivalsRef2.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: arrivalsRef2.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    if (cardsRef2.current) {
      gsap.fromTo(
        cardsRef2.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef2.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar />
      {/* yeh landing page ka front wala image and text h */}
      <div className="bg-white p-9 mb-3 ">
        <div className="relative h-[400px] flex items-center justify-between">
          {/* Text on the left */}
          <div className="flex-1  ml-8 flex-col justify-center items-start pl-8">
            <h1
              ref={textRef}
              className="text-4xl text-gray-800 epunda-slab-medium text-left"
            ></h1>
            {/* <p ref={descRef} className="text-left epunda-slab-medium mt-4"></p> */}
          </div>

          {/* Image in the center */}
          <div ref={imageRef} className="flex justify-center items-center">
            <Image
              src={model}
              alt="image"
              width={400}
              height={400}
              className="h-[450px] mt-34 w-auto object-contain"
            />
          </div>

          {/* Empty space on the right for balance */}
          <div className="flex-1 items-center text-black ml-8 ">
            {/* <h1
              ref={textRef2}
              className="text-4xl epunda-slab-medium text-left"
            ></h1> */}
            <p
              ref={descRef2}
              className=" text-3xl text-gray-700 epunda-slab-medium mt-4"
            ></p>
          </div>
        </div>
      </div>

      {/* latest wala section */}
      <div className="relative text-black mt-20 mb-9">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/newarrival.png"
            alt="New Arrivals Background"
            fill
            className="object-contain opacity-100"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 ">
          <div
            ref={arrivalsRef}
            className="flex flex-col justify-center text-center py-3"
          >
            <h1 className=" text-3xl epunda-slab-medium">
              NEW <span className="text-gray-700 ">ARRIVALS</span>
            </h1>
            <h2 className="text-gray-700">
              Fresh Styles, New Trends – Explore Our Latest Collections!
            </h2>
          </div>
          <div ref={cardsRef}>
            <ProductCard type="latest" />
          </div>
        </div>
      </div>

      {/* best seller wala section */}
      <div className=" text-black mt-24 ">
        <div
          ref={arrivalsRef2}
          className="flex flex-col justify-center text-center"
        >
          <h1 className=" text-3xl epunda-slab-medium">
            BEST <span className="text-gray-700"> ARTICLES </span>
          </h1>
          <h2>Most Loved, Most Wanted – Shop Our Best Sellers!</h2>
        </div>
        <div ref={cardsRef2}>
          <ProductCard type="bestSeller" />
        </div>
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
            <Image
              src={policyLogo}
              alt="image"
              width={40}
              height={40}
              className="mb-1"
            />
            <p className="text-2xl epunda-slab-medium text-gray-800">
              Easy Exchange Policy
            </p>
            <p className="text-gray-600">
              We offer hassle free Exchanging policy
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
