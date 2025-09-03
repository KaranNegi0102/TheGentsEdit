"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ProductCard (){

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        
        const rotateX = (y / height) * 15; 
        const rotateY = -(x / width) * 15; 

        const shadowX = -(x / width) * 30;
        const shadowY = -(y / height) * 30;

        gsap.to(card, {
          rotateX,
          rotateY,
          boxShadow: `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.3), 0 0 60px rgba(249, 193, 72,0.6)`,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 0 0 rgba(0,200,255,0)", // reset
          ease: "power2.out",
          duration: 0.8,
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const products = [
    {
      itemName: "Jeans",
      price: 900,
      description: "Classic blue denim jeans with a slim fit.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "T-Shirt",
      price: 500,
      description: "Soft cotton white t-shirt for everyday wear.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Leather Jacket",
      price: 3500,
      description: "Premium black leather jacket with zip closure.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Sneakers",
      price: 2200,
      description: "Comfortable casual sneakers in modern design.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Formal Shirt",
      price: 1200,
      description: "White slim-fit formal shirt, wrinkle resistant.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Watch",
      price: 4500,
      description: "Stylish analog wristwatch with leather strap.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Backpack",
      price: 1800,
      description: "Durable travel backpack with multiple compartments.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Sunglasses",
      price: 800,
      description: "Polarized black sunglasses for UV protection.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
    {
      itemName: "Cap",
      price: 400,
      description: "Casual baseball cap, adjustable fit.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    },
  ];

  return (
    <div className="flex flex-wrap p-4 justify-center">
          {products.map((product, i) => (
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              key={i}
              className=" rounded-lg p-4 m-4 w-72 h-[420px] flex flex-col items-center justify-between shadow-md "
            >
              <Image
                src={product.image}
                alt={product.itemName}
                width={250}
                height={200}
                className="object-cover  "
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {product.itemName}
                </h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <p className="text-lg font-bold text-gray-700">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
  )
}