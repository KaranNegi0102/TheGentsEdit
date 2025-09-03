import React from 'react'
import logo from '../../public/logo.png'
import Image from 'next/image'


export default function Navbar () {
  return (
    <div className='flex flex-row text-[#4F4F4D] bg-[#f5f2e9] justify-between items-center p-4'>
      <div>
        <Image src={logo} alt='logo' width={250} height={250} className='mt-1' />
      </div>
      <div className='cursor-pointer epunda-slab-medium flex flex-row gap-4'>
        <h1 className='hover:underline' >Home</h1>
        <h1 className='hover:underline' >About</h1>
        <h1 className='hover:underline'>Contact</h1>
      </div>
      <div className='epunda-slab-medium  flex flex-row gap-4'>
        <h1>Sign In</h1>
        <h1>Sign Up</h1>
        <h1>Logout</h1>
        <h1>Profile</h1>
      </div>
    </div>
  )
}

