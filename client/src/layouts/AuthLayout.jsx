import React from 'react'
import { Link, Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <section className="auth-layout container mx-auto grid grid-cols-12 min-h-screen relative">
  <div className="hidden lg:block col-span-6 h-full">
    <img src="/images/image 9.png" className="w-full h-screen object-cover" />
  </div>

  <Link to="/" className="absolute top-5 left-[25%] lg:left-[13%]">
    <img src="/images/Frame 57.png" className="w-[200px] md:w-[300px] lg:w[300px]" />
  </Link>

  <div className="col-span-12 lg:col-span-6 p-4">
    <Outlet />
  </div>
</section>
  )
}
