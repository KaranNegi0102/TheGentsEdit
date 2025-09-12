"use client"
import Navbar from "@/components/Navbar";
import React,{useState} from "react";
import CollectionCard from "@/components/collectionCard";

export default function Collection() {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");


  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) 
        : [...prev, type] 
    );
  };




  return (
   <div className="bg-white">
      <Navbar />
      <div className="items-center text-center text-black">
        <div className="flex mt-9 text-gray-700">
          {/* filter sidebar */}
          <div className="flex-1 h-full p-4">
            <h1 className="text-2xl epunda-slab-medium mb-6">–– FILTERS ––</h1>

            {/* Type Filter */}
            <div className="mb-6 mt-14">
              {/* <h2 className="text-3xl epunda-slab-light mb-2">Type</h2> */}
              <div className="flex flex-col epunda-slab-light space-y-2 ml-4">
                {["Topwear", "Bottomwear", "Footwear"].map((type) => (
                  <label key={type} className="flex text-2xl  cursor-pointer items-center ">
                    <input
                      type="checkbox"
                      className="mr-2 cursor-crosshair text-3xl "
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h2 className="text-lg epunda-slab-light mt-12 mb-2">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-1/1 epunda-slab-light border-gray-700 border-2 ml-2 mr-2 p-4 rounded-md"
              >
                <option value="latest">Latest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* product list */}
          <div className="flex-4 h-full">
            <h1 className="text-3xl  mb-6">––– ALL ARTICLES –––</h1>
            <CollectionCard selectedTypes={selectedTypes} sortBy={sortBy} />
          </div>
        </div>
      </div>
    </div>
  );
}
