"use client";
import React, { useState, useEffect, useRef } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { ShoppingCart, User, Heart } from "lucide-react";
import gsap from "gsap";

import { useAppSelector } from "@/app/hooks/hooks";
// import { fetchUserData } from "@/app/redux/slices/authSlice";

export default function Navbar() {
  // const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const authLinksRef = useRef<(HTMLLIElement | null)[]>([]);

  console.log("this is in navbar", items);

  
  const [openModal, setOpenModal] = useState<"login" | "register" | null>(null);
  
  useEffect(() => {
    // Navbar entrance animation
    const navbarTimeline = gsap.timeline();
    
    // Set initial states
    gsap.set(
      [
        logoRef.current,
        ...navLinksRef.current.filter(Boolean),
        ...authLinksRef.current.filter(Boolean),
      ],
      {
        opacity: 0,
        y: -30,
      }
    );
    
    // Animate navbar elements
    navbarTimeline
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(
      navLinksRef.current.filter(Boolean),
      {
        opacity: 1,
        y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        authLinksRef.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2"
      );

    // Add hover animations for nav links
    navLinksRef.current.filter(Boolean).forEach((link) => {
      if (link) {
        const linkElement = link.querySelector("a");
        if (linkElement) {
          linkElement.addEventListener("mouseenter", () => {
            gsap.to(linkElement, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          linkElement.addEventListener("mouseleave", () => {
            gsap.to(linkElement, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      }
    });
  }, []);


  
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
  
  return (
    <>
      <div
        ref={navbarRef}
        className="flex flex-row text-[#4F4F4D] bg-white justify-between items-center p-4"
      >
        <div ref={logoRef}>
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
            <li
              ref={(el) => {
                navLinksRef.current[0] = el;
              }}
              className="relative"
            >
              <Link
                href="/"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-7.5 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                HOME
              </Link>
            </li>
            <li
              ref={(el) => {
                navLinksRef.current[1] = el;
              }}
              className="relative"
            >
              <Link
                href="/collection"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-22 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                COLLECTION
              </Link>
            </li>
            <li
              ref={(el) => {
                navLinksRef.current[2] = el;
              }}
              className="relative"
            >
              <Link
                href="/AboutUs"
                className="text-gray-700 font-bold after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-15 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
        <div className="epunda-slab-medium mr-[64px] flex flex-row gap-2">
          <ul className="flex space-x-7 ">
            {isLoggedIn ? (
              <>
                <li
                  ref={(el) => {
                    authLinksRef.current[0] = el;
                  }}
                  className="relative group"
                >
                  <Link
                    href="/Profile"
                    className="text-gray-700 font-bold hover:text-white"
                  >
                    <User
                      size={28}
                      className="hover:bg-gray-700 hover:p-1 hover:rounded-md"
                    />
                  </Link>

                  {/* Tooltip */}
                  <div className="absolute top-9 right-3 transform translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                    Profile
                  </div>
                </li>

                <li
                  ref={(el) => {
                    authLinksRef.current[1] = el;
                  }}
                  className="relative group"
                >
                  <Link
                    href="/Wishlist"
                    className="text-gray-700 font-bold hover:text-white"
                  >
                    <Heart
                      size={28}
                      className="hover:bg-gray-700 hover:p-1 hover:rounded-md"
                    />
                  </Link>

                  {/* Tooltip */}
                  <div className="absolute    transform top-9 right-3 translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                    Wishlist
                  </div>
                </li>

                <li
                  ref={(el) => {
                    authLinksRef.current[2] = el;
                  }}
                  className="relative"
                >
                  <Link
                    href="/Cart"
                    className="text-gray-700 font-bold relative "
                  >
                    <ShoppingCart
                      size={28}
                      className="hover:bg-gray-700 hover:p-1 hover:rounded-md hover:text-white"
                    />
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
                <li
                  ref={(el) => {
                    authLinksRef.current[0] = el;
                  }}
                  className="relative"
                >
                  <a
                    onClick={() => {
                      setOpenModal("login");
                    }}
                    className="text-gray-700 font-bold cursor-pointer after:content-[''] after:absolute after:left-2 after:-bottom-1 after:w-11 after:h-[2px] after:bg-gray-800 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    SIGN IN
                  </a>
                </li>
                <li
                  ref={(el) => {
                    authLinksRef.current[1] = el;
                  }}
                  className="relative"
                >
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
