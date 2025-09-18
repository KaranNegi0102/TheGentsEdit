"use client"
import React,{useState,useEffect} from 'react'
import axios from "axios"
import Image from "next/image"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

  const [orders,setOrders]=useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const { userData } = useAppSelector((state) => state.auth);
  console.log(userData)

  const userId=userData?.id;
  console.log(userId);
  // console.log(`/api/orders/${userId}`)


  useEffect(()=>{
    const fetchOrderData = async () =>{
      try{
        const response = await axios.get(`/api/orders/${userId}`)
        setOrders(response.data.orders)
        // console.log(response);
        // console.log(response.data.orders);
      }catch(error){
        console.log(error);
      }
    }
    fetchOrderData()
  },[userId])

  const toggleExpand = (orderId: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId) // collapse if open
        : [...prev, orderId] // expand if closed
    );
  };

  return (
    <div className="max-w-7xl max-h-7xl epunda-slab-medium bg-white mx-auto p-6">
      <Navbar/>
      <h1 className="text-3xl mt-16 font-bold  text-gray-700 mb-6">My Orders</h1>
    

      <div className='flex flex-col-2 gap-3'>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="flex-1 min-w-[300px] max-w-sm mb-6 border bg-gray-50 border-gray-300 rounded-lg shadow-md p-4"
            >
              {/* Order Details */}
              <div className="mb-4 text-gray-500">
                <h2 className="text-xl text-gray-800 font-semibold">
                  Order #{order.order_id}
                </h2>
                <p>Status: <span className="font-medium text-gray-900">{order.status}</span></p>
                <p>Total Amount: <span className='text-gray-900'>₹{order.total_amount}</span> </p>
                <p>Payment: <span className='text-gray-900' >{order.payment_method}</span> </p>
                <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                <p>Address: <span className='text-gray-900'> {order.shipping_address} </span> </p>
              </div>

              {/* Items in the Order */}
              {/* Toggle Button */}
              <button
                onClick={() => toggleExpand(order.order_id)}
                className="text-gray-600 cursor-pointer  font-medium"
              >
                {expandedOrders.includes(order.order_id)
                  ? "Hide Items ▲"
                  : "View Items ▼"}
              </button>

              {/* Items in the Order */}
              {expandedOrders.includes(order.order_id) && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Items
                  </h3>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center space-x-4 border-b pb-2"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                          <p className="text-gray-600">
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
      <Footer/>
    </div>
  )
}

export default Order
