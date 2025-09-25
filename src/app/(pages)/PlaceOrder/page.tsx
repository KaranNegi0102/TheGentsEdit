"use client";
import React, { useState , useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/app/hooks/hooks";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  const { userData } = useAppSelector((state) => state.auth);
  // console.log(userData?.address)
  const userId = userData?.id;
  
  const [shippingAddress, setShippingAddress] = useState(userData?.address ||"");


  useEffect(() => {
    if (userData?.address) {
      setShippingAddress(userData.address);
    }
  }, [userData]);
  


  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim() || !paymentMethod) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(`/api/orders/${userId}`, {
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
      });

      if (response.data.success) {
        setSuccess(true);
        setShippingAddress("");
        setPaymentMethod("COD");
        // Redirect to orders page after 2 seconds
        setTimeout(() => {
          window.location.href = "/orders";
        }, 2000);
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mt-16 epunda-slab-medium text-gray-800 mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Place Your Order
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your purchase with secure checkout
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Order placed successfully! Redirecting to orders page...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6">
            {/* Shipping Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter your complete shipping address including street, city, state, and postal code"
                rows={4}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Please provide a complete address for accurate delivery
              </p>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                disabled={loading}
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="UPI">UPI Payment</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
              <p className="text-xs text-gray-500">
                Choose your preferred payment method
              </p>
            </div>

            {/* Order Summary Placeholder */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Order Summary
              </h3>
              <p className="text-xs text-gray-600">
                Your order details will be confirmed after placing the order
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading || !shippingAddress.trim() || !paymentMethod}
              className="w-full bg-gray-700 hover:bg-black hover:cursor-pointer text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Placing Order...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  <span>Place Order</span>
                </span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
