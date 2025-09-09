"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  type: "login" | "register";
  onClose: () => void;
  onTypeChange: (type: "login" | "register") => void;
}

export default function AuthModal({
  isOpen,
  type,
  onClose,
  onTypeChange,
}: AuthModalProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const borderRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && formRef.current) {
      const [top, right, bottom, left] = borderRefs.current;

      const tl = gsap.timeline();

      tl.to(top, { width: "100%", duration: 2.3 })
        .to(right, { height: "80%", duration: 2.3 })
        .to(bottom, { width: "100%", duration: 2.3 })
        .to(left, { height: "80%", duration: 2.3 });
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      console.log("the login data is => ", data);

      const response = await axios.post("/api/auth/login", data, {
        withCredentials: true,
      });

      // console.log("this is my response ->" ,response.data)
      // console.log("this is my response user ->" ,response.data.user)
      // console.log("this is my response user ->" ,response.data.success)

      if (response.data.success) {
        console.log("user Logged In successfully");

        onClose();
        router.refresh();
        router.push("/");
      } else {
        console.log("user not logged in ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black backdrop-blur-xs">
      <div className="bg-white shadow-lg p-8 w-[400px] relative " ref={formRef}>
        {/* Top border */}
        <span
          className="absolute top-0 left-0 w-0 h-[2px] bg-gray-700"
          ref={(el) => {
            borderRefs.current[0] = el;
          }}
        ></span>
        {/* Right border */}
        <span
          className="absolute top-0 right-0 w-[2px] h-0 bg-gray-700"
          ref={(el) => {
            borderRefs.current[1] = el;
          }}
        ></span>
        {/* Bottom border */}
        <span
          className="absolute bottom-0 right-0 w-0 h-[2px] bg-gray-700"
          ref={(el) => {
            borderRefs.current[2] = el;
          }}
        ></span>
        {/* Left border */}
        <span
          className="absolute bottom-0 left-0 w-[2px] h-0 bg-gray-700"
          ref={(el) => {
            borderRefs.current[3] = el;
          }}
        ></span>
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        {/* Login Form */}
        {type === "login" && (
          <div>
            <h1 className="text-3xl epunda-slab-medium mb-2 text-gray-800 text-center">
              The Gents Edit
            </h1>
            <h2 className="text-sm epunda-slab-medium mb-10 text-gray-700 text-center">
              Visit your account
            </h2>
            <form
              onSubmit={handleSubmit(onLogin)}
              className="flex flex-col epunda-slab-light items-center gap-3"
            >
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is Required" })}
                className="border-gray-300 border w-full text-gray-700 p-2 "
              />
              {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}

              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is Required" })}
                className="border-gray-300 border mb-7 text-gray-700 w-full p-2"
              />
              <button className="bg-black text-white w-1/2 p-2 cursor-pointer hover:bg-gray-700">
                Sign In
              </button>

              <p className="text-center mt-3 text-sm">
                Don&apos;t have account ? <br />
                <span
                  className="hover:underline  hover:text-gray-700 cursor-pointer"
                  onClick={() => {
                    onTypeChange("register");
                  }}
                >
                  {" "}
                  Create Account{" "}
                </span>
              </p>
            </form>
          </div>
        )}

        {/* Register Form */}
        {type === "register" && (
          <div>
            <h1 className="text-3xl epunda-slab-medium mb-2 text-gray-800 text-center">
              The Gents Edit
            </h1>
            <h2 className="text-sm epunda-slab-light mb-13 text-gray-600 text-center">
              Edit your account
            </h2>
            <form className="flex flex-col epunda-slab-light items-center gap-3">
              <input
                type="name"
                placeholder="Name"
                className="border-gray-300 border w-full text-gray-700 p-2 "
              />
              <input
                type="email"
                placeholder="Email"
                className="border-gray-300 border w-full text-gray-700 p-2 "
              />
              <input
                type="password"
                placeholder="Password"
                className="border-gray-300 border text-gray-700 w-full p-2"
              />
              <input
                type="phone"
                placeholder="Phone"
                className="border-gray-300 border mb-7 text-gray-700 w-full p-2"
              />
              <button className="bg-black text-white w-1/2 p-2 cursor-pointer hover:bg-gray-700">
                Sign Up
              </button>
              <p className="text-center mt-3 text-sm">
                Already have account ? <br />
                <span
                  className="hover:underline  hover:text-gray-700 cursor-pointer"
                  onClick={() => {
                    onTypeChange("login");
                  }}
                >
                  {" "}
                  Login{" "}
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
