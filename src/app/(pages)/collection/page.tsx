import Navbar from "@/components/Navbar";
import React from "react";
import CollectionCard from "@/components/collectionCard";

export default function Collection() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="items-center text-center   text-black">
        <div className="flex mt-8  text-gray-700">
          {/* filter part div where various filters  will be held*/}
          <div className=" flex-1 h-full p-4 ">
            <h1 className="text-2xl epunda-slab-medium mb-6">–– FILTERS ––</h1> 
            {/* Type Filter */}
            <div className="mb-6  mt-14 border-gray-400 border">
              <h2 className="text-lg epunda-slab-light mb-2">Type</h2>
              <div className="flex flex-col epunda-slab-light space-y-2 ml-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Top Wear
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Lower
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Shoes
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Accessories
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6  ">
              <h2 className="text-lg epunda-slab-light mb-2">Sort By</h2>
              <select className="w-1/1 epunda-slab-light border ml-2 mr-2 p-2 rounded-md">
                <option value="latest">Latest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Apply Filters
            </button>
          </div>

          {/* collection part div where collections will be shown */}
          <div className="flex-4 h-full">
            <h1 className="text-3xl mb-6">––––– ALL COLLECTIONS –––––</h1>
            <CollectionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
