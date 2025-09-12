"use client";
import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAppSelector } from "@/app/hooks/hooks";
import Link from "next/link"

interface ProductCardProps {
  type: "latest" | "bestSeller";
}

export default function ProductCard({ type }: ProductCardProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { products } = useAppSelector((state) => state.products);
  console.log("this is my products in product card", products);

  const filteredProducts = useMemo(() => {
    if (type === "latest") {
      return [...products].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 8).sort(() => Math.random() - 0.5).reverse();

    } else if (type === "bestSeller") {
      return products.filter((p) => p.best_seller === true).slice(0, 4);
    }
    return products;
  }, [products, type]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const eventHandlers: Array<{
      card: HTMLDivElement;
      handleMouseMove: (e: MouseEvent) => void;
      handleMouseLeave: () => void;
    }> = [];

    cards.forEach((card) => {
      if (!card) return;

      // Set initial CSS properties for 3D transforms
      gsap.set(card, {
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      });

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
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 0 0 rgba(0,200,255,0)",
          ease: "power2.out",
          duration: 0.8,
        });
      };

      // Store handlers for proper cleanup
      eventHandlers.push({ card, handleMouseMove, handleMouseLeave });

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      eventHandlers.forEach(({ card, handleMouseMove, handleMouseLeave }) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [filteredProducts]);

  // const Products = [
  //   {
  //     title: "Jeans",
  //     price: 900,
  //     description: "Classic blue denim jeans with a slim fit.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "T-Shirt",
  //     price: 500,
  //     description: "Soft cotton white t-shirt for everyday wear.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Leather Jacket",
  //     price: 3500,
  //     description: "Premium black leather jacket with zip closure.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Sneakers",
  //     price: 2200,
  //     description: "Comfortable casual sneakers in modern design.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     itemName: "Formal Shirt",
  //     price: 1200,
  //     description: "White slim-fit formal shirt, wrinkle resistant.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Watch",
  //     price: 4500,
  //     description: "Stylish analog wristwatch with leather strap.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Backpack",
  //     price: 1800,
  //     description: "Durable travel backpack with multiple compartments.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Sunglasses",
  //     price: 800,
  //     description: "Polarized black sunglasses for UV protection.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  //   {
  //     title: "Cap",
  //     price: 400,
  //     description: "Casual baseball cap, adjustable fit.",
  //     image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
  //   },
  // ];

  console.log("this is my filtereed products", filteredProducts);

  return (
    <div className="flex  flex-wrap p-4 justify-center">
      {filteredProducts.map((product) => (
        <Link key={product.id} href={`/productInfo/${product.id}`} className="mt-8">
          <div
            ref={(el) => {
              cardRefs.current[product.id] = el;
            }}
            key={product.id}
            className=" rounded-lg p-4 m-2 cursor-pointer w-55 h-full flex flex-col  justify-between shadow-lg transition-all duration-300 ease-out"
          >
            <Image
              src={product.images?.[0]}
              alt={product.title}
              width={300}
              height={300}
              className="object-cover   h-[245px] w-full mb-4 "
            />
            <div className="text-left ">
              <h3 className="text-md epunda-slab-medium mb-2">{product.title}</h3>
              {/* <p className="text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p> */}
            </div>
            <p className="text-md epunda-slab-light text-gray-700">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
