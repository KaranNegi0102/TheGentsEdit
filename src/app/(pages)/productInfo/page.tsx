"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/app/hooks/hooks";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
  brand?: string;
  best_seller?: boolean;
  stock_quantity?: number;
}

export default function ProductInfo() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("/logo.png");
  const { userData } = useAppSelector((state) => state.auth);

  console.log("this is my userdata in profile", userData?.id);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/getProductById/${productId}`);
        const p: Product = res?.data?.product;
        if (p) {
          setProduct(p);
          const imagesValue = (p as unknown as { images?: unknown }).images;
          const imgs = Array.isArray(imagesValue)
            ? (imagesValue as string[])
            : typeof imagesValue === "string"
            ? [imagesValue as string]
            : [];
          setMainImage(imgs[0] || "/logo.png");
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/logo.png"];

  const handleAddToCart = async () => {
    try {
      const userId = userData?.id;
      if (!userId) {
        alert("Please log in to add items to your cart.");
        return;
      }
      if (!productId) {
        alert("Invalid product.");
        return;
      }

      await axios.post(`/api/cart/${userId}`, {
        productId: productId,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

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
                  className={`border border-black object-cover rounded cursor-pointer ${
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
          <h1 className="text-4xl epunda-slab-medium">{product.title}</h1>
          <p className="text-3xl epunda-slab-light ">₹{product.price}</p>
          <p className="epunda-slab-light leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl epunda-slab-light ">
            In STOCK -- {product.stock_quantity}
          </p>
          <p className="text-2xl epunda-slab-light ">{product.brand}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded-lg cursor-pointer hover:bg-gray-800"
          >
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
            <div className="px-6 py-3 text-sm md:text-base border-t border-l border-gray-300 epunda-slab-medium transition-colors ">
              Description
            </div>
            <div className="px-6 py-3 text-sm md:text-base border-t border-r border-l border-gray-300 epunda-slab-medium transition-colors text-gray-600">
              Reviews (122)
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 border border-gray-300">
            <div className="space-y-4 text-gray-700 epunda-slab-light  leading-relaxed p-3 m-3">
              <p>
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                showcase their products, interact with customers, and conduct
                transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </p>
              <p>
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
