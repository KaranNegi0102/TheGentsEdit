"use client"
import Navbar from "@/components/Navbar";
import React,{useState} from "react";
import CollectionCard from "@/components/collectionCard";
import { Search } from 'lucide-react';

export default function Collection() {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchQuery , setSearchQuery] = useState<string>("");


  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) 
        : [...prev, type] 
    );
  };




  return (
   <div className="bg-white mt-17">
      <Navbar />
      <div className="items-center text-center text-black">
        <div className="flex mt-9 text-gray-700">
          {/* filter sidebar */}
          <div className="flex-1  h-full p-4">
            <h1 className="text-2xl ml-2 text-left epunda-slab-medium mb-6">FILTERS</h1>

            {/* Type Filter */}
            <div className="mb-6  mt-14">
              
              <div className="flex flex-col epunda-slab-light space-y-2  p-3">
                <h2 className="text-xl epunda-slab-medium mb-2 text-left">Type</h2>
                {["Topwear", "Bottomwear", "Footwear"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-xl cursor-pointer select-none 
                        transform transition-transform duration-200 hover:translate-x-5">
                    <input
                      type="checkbox"
                      className="h-3 w-3 cursor-pointer accent-[#c1c121] focus:ring-0 focus:outline-none "
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6 ">
              <h2 className="text-lg epunda-slab-medium text-left ml-3  mt-12 mb-2">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-1/1 epunda-slab-light border-gray-300 cursor-pointer border-2 ml-2 mr-2 p-3 rounded-md"
              >
                <option value="latest">Latest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* product list */}
          <div className="flex-4  h-full">
            <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl text-left mt-4 mb-6 epunda-slab-medium text-gray-500 ml-6">ALL  <span className="text-gray-800 ml-1">COLLECTIONS ––––</span> </h1>
              <input 
              type="text"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="border-2 border-gray-300 rounded-md mr-7 p-3 w-64 text-black"
              >
              </input>
            </div>
            <CollectionCard selectedTypes={selectedTypes} sortBy={sortBy} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
