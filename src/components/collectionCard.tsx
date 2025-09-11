"use client";
// import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import axios from "axios";
import { useAppSelector } from "@/app/hooks/hooks";

// interface ProductApi {
//   id: number;
//   title: string;
//   description: string;
//   price: number | string;
//   images?: string[] | string | null;
// }

export default function CollectionCard() {
  // const [products, setProducts] = useState<ProductApi[]>([]);

  const { products } = useAppSelector((state) => state.products);
  console.log("this is my products" ,products)



  // note --------------------------------------------
  // the below use effect part is not wrong u can read it but it was taking a lot of time and extra api were hitting useless and i found a new and optimal solution for that and thats the reason this below code is commented
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get("/api/getProduct");
  //       const rows: ProductApi[] = response?.data?.product ?? [];
  //       setProducts(Array.isArray(rows) ? rows : []);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchProduct();
  // }, []);


  return (
    <div className=" grid grid-cols-3 epunda-slab-medium p-3 ">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/productInfo/${product.id}`}
            className=" p-3 cursor-pointer h-full flex flex-col  "
          >
            <div className="overflow-hidden">
              <Image
                src={product?.images?.[0]}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover h-[400px] transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>

            <div className="bg-[#f5f2e9]  mb-8 p-3 flex flex-col text-left ">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              {/* <p className="text-gray-600 mb-2 line-clamp-2">
                // {product.description}
              </p> */}
              <p className="text-lg mt-3 text-left font-bold text-gray-700 ">
                ₹{product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
