"use client";

import React from "react";

export default function ProductInfoSkeleton() {
  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto animate-pulse">
      {/* Left: images skeleton */}
      <div className="flex-1">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[100px] w-[100px] bg-gray-200 rounded-lg"
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="h-[400px] w-[400px] bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Right: details skeleton */}
      <div className="flex-1 max-w-sm space-y-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-6 w-28 bg-gray-200 rounded mt-8" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
          <div className="h-3 w-4/6 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-full bg-gray-300 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-56 bg-gray-200 rounded" />
          <div className="h-3 w-64 bg-gray-200 rounded" />
          <div className="h-3 w-72 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
