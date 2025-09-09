"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Cart = () => {
  // Sample cart data - in a real app, this would come from state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Men Round Neck Pure Cotton T-shirt",
      price: 999,
      quantity: 2,
      image:
        "https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      description:
        "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.",
    },
    {
      id: 2,
      name: "Classic Blue Denim Jeans",
      price: 900,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
      description: "Classic blue denim jeans with a slim fit.",
    },
    {
      id: 3,
      name: "Premium Leather Jacket",
      price: 3500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
      description: "Premium black leather jacket with zip closure.",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl epunda-slab-medium mb-8 text-[#4F4F4D]">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl epunda-slab-light text-gray-600 mb-4">
              Your cart is empty
            </p>
            <a
              href="/collection"
              className="bg-black text-white px-6 py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-6 flex gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl epunda-slab-medium mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 epunda-slab-light mb-3 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-2xl epunda-slab-medium text-[#4F4F4D] mb-4">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 epunda-slab-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 epunda-slab-light text-sm underline"
                      >
                        Remove
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

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between epunda-slab-light">
                    <span>
                      Subtotal (
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
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

                <button className="w-full bg-black text-white py-3 rounded-lg epunda-slab-medium hover:bg-gray-800 transition-colors mb-4">
                  Proceed to Checkout
                </button>

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
