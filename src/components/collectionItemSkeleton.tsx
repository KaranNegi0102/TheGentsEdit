import React from 'react'

const CartItemSkeleton = () => {
  return (
    <div className="border border-gray-200 bg-gray-100 rounded-lg p-6 flex flex-col  gap-4 animate-pulse">
      <div className="w-[220px] h-[320px] bg-gray-300 rounded"/>
      <div className="flex-1 space-y-2">
        <div  className="flex gap-2">

        <div className="w-8 h-8 bg-gray-300 rounded"/>
        <div className="w-3/4  bg-gray-300 rounded"/>
        
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded"/>
          <div className="w-8 h-8 bg-gray-300 rounded"/>
          <div className="w-8 h-8 bg-gray-300 rounded"/>
          <div className="w-8 h-8 bg-gray-300 rounded"/>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton
