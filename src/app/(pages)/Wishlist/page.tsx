"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppSelector , useAppDispatch } from "@/app/hooks/hooks";
import { addToCart,fetchCart } from "@/app/redux/slices/cartSlice";
// import axios from "axios";
import {
  fetchWishlist,
  removeFromWishlist,
} from "@/app/redux/slices/wishlistSlice";





// interface WishlistItem {
//   id: number;
//   title: string;
//   price: number;
//   images: string[];
//   product_id: number;
//   created_at: string;
// }

const Wishlist = () => {
  const { userData } = useAppSelector((state) => state.auth);
  // const { products } = useAppSelector((state) => state.products);
  const { items: cartItems, status } = useAppSelector((state) => state.cart);
  const { items:wishlistItems } = useAppSelector((state) => state.wishlist);

  const dispatch = useAppDispatch();


  // const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  console.log("this is my wishlist items",wishlistItems)


  // Fetch wishlist
  useEffect(() => {
    if (userData?.id ) {
      dispatch(fetchWishlist(userData.id));
    }
  }, [userData, dispatch]);
  // useEffect(() => {







  //   const fetchWishlist = async () => {
  //     if (!userData?.id) {
  //       setLoading(false);
  //       return;
  //     }
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`/api/wishlist/${userData?.id}`);
  //       console.log("this is my response in wishlist part response",response);
  //       setWishlistItems(response.data.wishlist || []);
  //       setError(null);
  //     } catch (err) {
  //       console.error("Error fetching wishlist:", err);
  //       setError("Failed to load wishlist items");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, [userData]);




  // Remove item from wishlist
  
  
  
  const handleRemoveFromWishList = (productId: number) => {
    if (!userData?.id) return;
    dispatch(removeFromWishlist({ userId: userData.id, productId }));
  };
  // const removeFromWishlist = async (productId: number) => {
  //   if (!userData?.id) return;
  
  //   try {
  //     const userId = userData.id;
  
  //     await axios.delete(`/api/wishlist/${userId}`, {
  //       data: { productId },
  //     });
  
  //     setWishlistItems((prev) =>
  //       prev.filter((item) => item.product_id !== productId)
  //     );
  //   } catch (err) {
  //     console.error("Error removing from wishlist:", err);
  //     setError("Failed to remove item from wishlist");
  //   }
  // };

  
  const handleAddToCart = async (item:any) => {
    if (!userData?.id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (!item.productId) {
      alert("Invalid product.");
      return;
    }

  //   // 🚀 Optimistic update (instant cart badge update)
  // dispatch(
  //   addToCartOptimistic({
  //     productId: item.productId,
  //     title: item.title,
  //     price: item.price,
  //     description: item.description,
  //     images: item.images,
  //   })
  // );


  setAddingProductId(item.productId);

  try {
    await dispatch(addToCart({ userId: userData.id, productId: item.productId }));
    // await dispatch(fetchCart(userData.id));
  } finally {
    setAddingProductId(null); // reset after API call finishes
  }

    // await dispatch(addToCart({ userId: userData.id, productId: item.productId }));
    // // alert("Added to cart!");

    // dispatch(fetchCart(userData.id));
  };

  // if (status === "loading") {
  //   return (
  //     <div className="bg-white text-black min-h-screen">
  //       <Navbar />
  //       <div className="max-w-7xl backdrop-blur mx-auto px-6 py-8">
  //         <div className="flex justify-center items-center h-64">
  //           <div className="text-xl epunda-slab-light text-gray-600">
  //             Loading your wishlist...
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  if (!userData) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-4xl epunda-slab-medium mb-8 text-[#4F4F4D]">
              My Wishlist
            </h1>
            <p className="text-xl epunda-slab-light text-gray-600 mb-4">
              Please log in to view your wishlist
            </p>
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white mt-17 text-black min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl epunda-slab-medium mb-8 text-[#4F4F4D]">
          My Wishlist
        </h1>

        {status === "failed" && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 epunda-slab-light">{error}</p>
          </div>
        )}

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-xl epunda-slab-light text-gray-600 mb-4">
              Your wishlist is empty
            </p>
            <p className="text-gray-500 epunda-slab-light mb-6">
              Start adding items you love to your wishlist
            </p>
            <Link
              href="/collection"
              className="bg-black text-white px-6 py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const alreadyInCart = Array.isArray(cartItems) &&
              cartItems.some((cartItem) => cartItem.productId === item.productId);            
              return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* <p>{item.idofproduct}</p> */}
                <Link href={`/productInfo/${item.productId}`}>
                  <div className="relative">
                    <Image
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFromWishList(item.productId);
                      }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/productInfo/${item.productId}`}>
                    <h3 className="text-lg epunda-slab-medium mb-2 line-clamp-1 hover:text-gray-600 transition-colors ">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-xl epunda-slab-medium text-[#4F4F4D] mb-4">
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`flex-1 py-2 px-4 rounded-lg epunda-slab-medium cursor-pointer text-sm transition-colors ${
                      alreadyInCart
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    disabled={alreadyInCart || addingProductId === item.productId}
                  >
                    {alreadyInCart
                      ? "Added"
                      : addingProductId === item.productId
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                    <button
                      onClick={() => handleRemoveFromWishList(item.productId)}
                      className="px-3 py-2 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/collection"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg epunda-slab-medium hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
