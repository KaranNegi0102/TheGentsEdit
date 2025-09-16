"use client";

import React, { useEffect, useState } from "react";
import { addToCart, fetchCart } from "@/app/redux/slices/cartSlice";
// import axios from "axios";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { fetchProducts } from "@/app/redux/slices/productSlice";
import { useParams } from "next/navigation";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   images: string[];
//   category?: string;
//   brand?: string;
//   best_seller?: boolean;
//   stock_quantity?: number;
// }

export default function ProductInfo() {
  // const [product, setProduct] = useState<Product | null>(null);
  // const [mainImage, setMainImage] = useState<string>("/logo.png");
  const { userData } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { id } = useParams(); // product id from /product/[id]
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { products, status } = useAppSelector((state) => state.products);

  const product = products.find((p) => String(p.id) == String(id));

  const [mainImage, setMainImage] = useState("/logo.png");

  useEffect(() => {
    if (!products.length && status == "idle") {
      dispatch(fetchProducts());
    }
  }, [products.length, status, dispatch]);

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // fetch cart on page load
  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchCart(userData.id));
    }
  }, [userData, dispatch]);

  const handleAddToCart = async () => {
    if (!userData?.id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (!productId) {
      alert("Invalid product.");
      return;
    }

    dispatch(addToCart({ userId: userData.id, productId }));
    alert("Added to cart!");

    dispatch(fetchCart(userData.id));
  };

  // needed to update this below part
  if (status === "loading" && !product) {
    return <p className="p-8">Loading...</p>;
  }

  if (!product) {
    return <p className="p-8">Product not found.</p>;
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/logo.png"];

  return (
    <div className="bg-white mt-17 text-black">
      <Navbar />
      <div className="flex gap-6 p-6 max-w-6xl mx-auto">
        {/* product images part */}
        <div className="flex-1">
          <div className="flex gap-3">
            {/* Thumbnail images */}
            <div className="flex flex-col gap-2">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`thumb-${index}`}
                  height={100}
                  width={100}
                  className={`border-2 border-gray-300 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    image === mainImage
                      ? "border-gray-800 ring-2 ring-gray-300"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 flex justify-center items-center">
              <Image
                src={mainImage}
                alt="main product"
                height={400}
                width={400}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        {/* product information part */}
        <div className="flex-1 max-w-sm space-y-4">
          <p className="text-lg epunda-slab-light text-gray-600">
            {product.brand}
          </p>
          <h1 className="text-3xl epunda-slab-medium text-gray-800  leading-tight">
            {product.title}
          </h1>
          <p className="text-2xl epunda-slab-light mt-8 text-gray-800">
            ₹{product.price}
          </p>
          <p className="epunda-slab-light leading-relaxed text-gray-700 text-sm">
            {product.description}
          </p>
          <div className="space-y-2">
            <p className="text-lg epunda-slab-light text-green-600">In STOCK</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={cartItems.some(
              (cartItem) => cartItem.productId === product.id
            )}
            className={`w-full py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium ${
              cartItems.some((cartItem) => cartItem.productId === product.id)
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {cartItems.some((cartItem) => cartItem.productId === product.id)
              ? "Added"
              : "Add to Cart"}
          </button>
          <div className="text-xs epunda-slab-light text-gray-500 leading-relaxed space-y-1">
            <p>✓ 100% Original product</p>
            <p>✓ Free delivery on orders above ₹49</p>
            <p>✓ Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs: Description | Reviews */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Tab headers */}
          <div className="flex">
            <div className="px-4 py-3 text-sm border-b-2 border-black epunda-slab-medium bg-gray-50">
              Description
            </div>
            <div className="px-4 py-3 text-sm epunda-slab-medium text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">
              Reviews (122)
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            <div className="space-y-3 text-gray-700 epunda-slab-light leading-relaxed text-sm">
              <p>
                {product.brand} <br />
              </p>
              <p className="text-2xl epunda-slab-medium">{product.title}</p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
