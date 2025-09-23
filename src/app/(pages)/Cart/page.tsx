"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  fetchCart,
  removeFromCart,
  updateCartItem,
  updateCartItemLocal,
} from "@/app/redux/slices/cartSlice";
import Link from "next/link";
import { Trash } from "lucide-react";
import CartItemSkeleton from "@/components/cartItemSkeleton";
import {toast} from "react-hot-toast";

// interface CartItemType {
//   id: number;
//   productId: number;
//   title: string;
//   price: number;
//   quantity: number;
//   images: string[];
//   description?: string;
// }

const Cart = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const { items: cartItems, status } = useAppSelector((state) => state.cart);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchCart(userData.id));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  // const updateQuantity = (productId: number, newQuantity: number) => {
  //   if (newQuantity <= 0) {
  //     removeItem(productId);
  //     return;
  //   }

  //   if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

  //   debounceTimeoutRef.current = setTimeout(() => {
  //     if (userData?.id) {
  //       dispatch(
  //         updateCartItem({
  //           userId: userData.id,
  //           productId,
  //           quantity: newQuantity,
  //         })
  //       ).then(() => {
  //         dispatch(fetchCart(userData.id));
  //       });
  //     }
  //   }, 3000);
  // };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    // Update UI immediately by changing Redux state
    dispatch(
      updateCartItemLocal({
        productId,
        quantity: newQuantity,
      })
    );

    // Debounce backend update
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    debounceTimeoutRef.current = setTimeout(() => {
      if (userData?.id) {
        dispatch(
          updateCartItem({
            userId: userData.id,
            productId,
            quantity: newQuantity,
          })
        );
        toast("Updated quantity",{
          icon:'✅',
          position:'top-right',
          style:{
            background:"black",
            color:"white"
          }
        })
      }
    });
  };

  const removeItem = (productId: number) => {
    if (userData?.id) {
      dispatch(removeFromCart({ userId: userData.id, productId }));
      toast("Removed from Cart",{
        icon:'🛒',
        position:'bottom-center',
        style:{
          background:"black",
          color:"white"
        }
      })
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="bg-white text-black mt-17 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl text-center epunda-slab-medium mb-8 text-[#4F4F4D]">
          My Cart
        </h1>

        {status === "loading" ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl epunda-slab-light text-gray-600 mb-4">
              Your cart looks empty right now.
            </p>
            <a
              href="/collection"
              className="bg-gray-700 text-white px-6 py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors"
            >
              Lets Go For Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 bg-gray-100 rounded-lg p-6 flex gap-4"
                >
                  <Link href={`/productInfo/${item.productId}`}>
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title || "Product Image"}
                        width={120}
                        height={120}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-[120px] h-[120px] bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </Link>

                  <div className="flex-1">
                    <Link href={`/productInfo/${item.productId}`}>
                      <h3 className="text-xl text-gray-800 epunda-slab-medium mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 epunda-slab-light mb-3 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-2xl epunda-slab-medium text-[#4F4F4D] mb-4">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border bg-white border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 epunda-slab-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-800 cursor-pointer epunda-slab-light text-sm underline"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl epunda-slab-medium text-[#4F4F4D]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="text-2xl epunda-slab-medium mb-6 text-[#4F4F4D]">
                  Order Summary
                </h2>

                {status === "loading" ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/2" />
                    <div className="h-6 bg-gray-300 rounded w-1/3" />
                    <div className="h-10 bg-gray-300 rounded w-full" />
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between epunda-slab-light">
                      <span>
                        Subtotal (
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between epunda-slab-light">
                      <span>GST (18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-xl epunda-slab-medium">
                        <span>Total</span>
                        <span className="text-[#4F4F4D]">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Link href="/PlaceOrder">
                  <button className="w-full bg-black text-white py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors mb-4">
                    Proceed to Checkout
                  </button>
                </Link>

                <div className="text-sm epunda-slab-light text-gray-600 space-y-2">
                  <p>✓ Free delivery on orders above ₹49</p>
                  <p>✓ Easy return and exchange policy within 7 days</p>
                  <p>✓ 100% Original products</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
