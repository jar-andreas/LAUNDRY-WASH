import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Drawer({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <Menu onClick={() => setIsOpen(true)} className="md:hidden text-white" />
      <div
        className={`drawer fixed top-0 left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu bg-(--Nav) text-base-content min-h-full w-90 p-4">
            <Link to="/" className="font-bold text-xl">
              <img
                src="/images/Frame 2.png"
                alt="logo"
                className="w-[70%] mb-4"
              />
            </Link>
            <button
              className="absolute right-2 top-4 btn btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="text-white" />
            </button>
            {user ? (
              <div className="mt-6 text-white">
                <h1 className="font-semibold text-xl capitalize">
                  Hi, {user.fullname}
                </h1>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-xl"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/book-laundry"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-xl"
                  >
                    Book Laundry
                  </Link>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="font-medium text-xl"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-white font-medium text-xl mt-4"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-white font-medium text-xl"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
