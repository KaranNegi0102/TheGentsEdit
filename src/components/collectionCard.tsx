import React from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";

export default function CollectionCard() {
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
    <div className=" grid grid-cols-3    epunda-slab-medium p-3 ">
      {products.map((product, i) => (
        <div
          key={i}
          className=" p-3 cursor-pointer h-full flex flex-col  "
        >
          <div className="overflow-hidden">
            <Image
              src={product.image}
              alt={product.itemName}
              width={300}
              height={600}
              className="object-cover h-[340px]  transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>

          <div className="bg-[#f5f2e9] h-[145px] mb-8 p-3 flex flex-col text-left ">
            <h3 className="text-xl font-semibold mb-2">{product.itemName}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-lg mt-auto text-left font-bold text-gray-700 ">
              ₹{product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
