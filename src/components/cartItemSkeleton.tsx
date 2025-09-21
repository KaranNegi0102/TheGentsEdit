import React from 'react'

const CartItemSkeleton = () => {
  return (
    <div className="border border-gray-200 bg-gray-100 rounded-lg p-6 flex gap-4 animate-pulse">
      <div className="w-[120px] h-[120px] bg-gray-300 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-6 bg-gray-300 rounded w-1/4" />
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded" />
          <div className="w-8 h-8 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton
