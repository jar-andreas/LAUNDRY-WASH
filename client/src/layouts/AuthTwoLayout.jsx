import React from "react";
import { Link, Outlet } from "react-router";

export default function AuthTwoLayout() {
  return (
    <div className="auth-background">
      <div className="min-h-screen w-full bg-black/20">
        <Link to="/" className="container mx-auto px-4 py-6 flex flex-col items-center">
          <img
            src="/images/Frame 57.png"
            alt="Logo"
            className="w-[350px] mb-12"
          />
        </Link>

        <Outlet />
      </div>
    </div>
  );
}
