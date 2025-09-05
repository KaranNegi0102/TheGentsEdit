import Navbar from '@/components/Navbar'
import React from 'react'
import ProductCard from "../../../components/productCard"

export default function Collection ()  {
  return (
    <div>
      <Navbar/>
      <div className='items-center text-center bg-white text-black'>
        <h1 className='text-4xl'>this is collection page where all collection will be showed</h1>
        <ProductCard/>
      </div>
    </div>
  )
}