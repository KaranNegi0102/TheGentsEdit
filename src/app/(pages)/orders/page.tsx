"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/app/hooks/hooks";

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  title: string;
  brand: string;
  image: string;
}

interface Order {
  order_id: number;
  status: string;
  total_amount: number;
  payment_method: string;
  created_at: string;
  shipping_address: string;
  items: OrderItem[];
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAppSelector((state) => state.auth);
  // console.log(userData)

  const userId = userData?.id;
  // console.log(userId);
  // console.log(`/api/orders/${userId}`)

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/orders/${userId}`);
        setOrders(response.data.orders);
        // console.log(response);
        // console.log(response.data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchOrderData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const toggleExpand = (orderId: number) => {
    setExpandedOrders(
      (prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId) 
          : [...prev, orderId] 
    );
  };

  return (
    <div className="max-w-7xl max-h-7xl epunda-slab-medium bg-white mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl mt-16 font-bold text-center text-gray-700 mb-6">
        –– My <span className="text-black">Orders –– </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="relative">
              {/* Outer spinning ring */}
              <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              {/* Inner pulsing dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full animate-pulse"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading your orders...
            </p>
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              You haven&apos;t placed any orders yet. Start shopping to see your
              order history here!
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="w-full h-full  border bg-gray-700 text-white border-gray-300 rounded-lg shadow-md p-4"
            >
              {/* Order Details */}
              <div className="mb-4 ">
                <h2 className="text-xl font-semibold">
                  Order #{order.order_id}
                </h2>
                <p>
                  Status:{" "}
                  <span className="font-medium ">
                    {order.status}
                  </span>
                </p>
                <p>
                  Total Amount:{" "}
                  <span className="">₹{order.total_amount}</span>{" "}
                </p>
                <p>
                  Payment:{" "}
                  <span className="">{order.payment_method}</span>{" "}
                </p>
                <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                <p>
                  Address:{" "}
                  <span className="">
                    {" "}
                    {order.shipping_address}{" "}
                  </span>{" "}
                </p>
              </div>

              {/* Items in the Order */}
              {/* Toggle Button */}
              <button
                onClick={() => toggleExpand(order.order_id)}
                className=" cursor-pointer  font-medium"
              >
                {expandedOrders.includes(order.order_id)
                  ? "Hide Items ▲"
                  : "View Items ▼"}
              </button>

              {/* Items in the Order */}
              {expandedOrders.includes(order.order_id) && (
                <div className="mt-4 ">
                  <h3 className="text-lg font-semibold mb-2 ">
                    Items
                  </h3>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center  space-x-4 border-b pb-2"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium ">
                            {item.title}
                          </p>
                          <p className="text-sm ">{item.brand}</p>
                          <p className="">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
