"use client";
// import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppSelector,useAppDispatch } from "@/app/hooks/hooks";
import { fetchWishlist } from "@/app/redux/slices/wishlistSlice";
import CartItemSkeleton from "@/components/collectionItemSkeleton";
import { toast } from 'react-hot-toast';




// interface ProductApi {
//   id: number;
//   title: string;
//   description: string;
//   price: number | string;
//   images?: string[] | string | null;
// }


interface CollectionCardProps {
  selectedTypes: string[];
  sortBy: string;
  searchQuery:string;
}

export default function CollectionCard({ selectedTypes, sortBy , searchQuery }: CollectionCardProps) {
  // const [products, setProducts] = useState<ProductApi[]>([]);

  const { products ,status } = useAppSelector((state) => state.products);
  const { userData } = useAppSelector((state)=>state.auth);
  const { items:wishlistItems  } = useAppSelector((state)=>state.wishlist);
  const dispatch = useAppDispatch();



  // console.log("this is my products" ,products)
  // console.log("this is my products" ,userData)
  // console.log("this is my products in cartitems in collection card" ,wishlistItems)


  let filteredProducts = products;

  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedTypes.includes(p.category) // assumes your product has a "type" field
    );
  }

  if(searchQuery.trim() !== ""){
    filteredProducts = filteredProducts.filter((p)=>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }


  // sorting part
  if (sortBy === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => Number(b.price) - Number(a.price));
  }
  // i have to add on
  // else if (sortBy === "popular") {
  //   filteredProducts = [...filteredProducts].sort((a, b) => b.sales - a.sales); // example
  // }
  // "


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

  const handleAddToWishlist= async (e:React.MouseEvent , productId:number)=>{
    e.preventDefault(); // ✅ stop <Link> navigation
    e.stopPropagation()

    if (!userData?.id) {
      toast(
        "Please Log In First To Add Items To Your Cart.",
        {
          duration: 2000,
        }
      );
      // alert("Please log in to add items to your cart.");
      return;
    }

    try{
      const userId = userData?.id;
      await axios.post(`/api/wishlist/${userId}`,{productId});
      // console.log("this is my response in wishlist part",res)
      toast("Added to wishlist",{
        icon:'❤️',
        position:'top-center',
        style: {
          background: "black",
          color: "white",
        },
      })
      // alert("Added to wishlist")

      dispatch(fetchWishlist(userData.id))
    }
    catch(error){
      console.log(error)
      toast.error("Failed to Add")
      // alert("not added to wishlist")
    }
  }


  return (
    <div className=" grid grid-cols-3 epunda-slab-medium p-3 ">


      {status === "loading"
      ? Array.from({ length: 6 }).map((_, i) => (
          <CartItemSkeleton key={i} />
        ))
      : filteredProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/productInfo/${product.id}`}
            className=" p-3 cursor-pointer h-full flex flex-col  "
          >
            <div className="overflow-hidden relative group">
              <Image
                src={product?.images?.[0]}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-[400px] transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              {/* ✅ Slide-up Overlay */}
              <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                {/* <button onClick={(e)=> handleAddToWishlist(e,product.id)} className="w-full bg-black/50 text-white py-2 text-center cursor-pointer hover:bg-gray-800">
                  ❤️ Add to Wishlist
                </button> */}
                <button
                      onClick={(e) => handleAddToWishlist(e,product.id)}
                      className={`flex-1 w-full py-4 px-4  epunda-slab-medium cursor-pointer text-sm transition-colors ${
                        wishlistItems.some(Item => Item.productId === product.id)
                          ? "bg-black/50 text-white cursor-not-allowed"
                          : "bg-black/50 text-white hover:bg-gray-800"
                      }`}
                      disabled={wishlistItems.some(Item => Item.productId === product.id)}
                    >
                      {wishlistItems.some(Item =>Item.productId ===product.id)
                        ? "❤️ Already Added"
                        : "❤️ Add to Wishlist"}
                    </button>
              </div>
            </div>

            <div className="bg-[#f5f2e9]  mb-8 p-3 flex flex-col text-left justify-between h-[100px] ">
              <h3 className="text-xl font-semibold line-clamp-1">{product.title}</h3>
              {/* <p className="text-gray-600 mb-2 line-clamp-2">
                // {product.description}
              </p> */}
              <p className="text-lg  text-left font-bold text-gray-700 ">
                ₹{product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
