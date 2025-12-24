import { Link, NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Drawer from "./Drawer";
import UserAvatar from "./UserAvatar";

export default function Nav() {
  const { user, handleLogout } = useAuth();

  return (
    <>
      <div className="fixed w-full z-50">
        <div className="container mx-auto px-4 w-full lg:px-6 py-6 flex justify-between items-center bg-(--Nav)">
          <Link to="/">
            <img src="/images/Frame 2.png" alt="Logo" className="w-[60%]" />
          </Link>
          <div className="hidden lg:flex gap-8 items-center text-xs">
            <a href="#" className="text-white">
              Services
            </a>
            <a href="#" className="text-white">
              About Us
            </a>
            <a href="#" className="text-white">
              Contact Us
            </a>
            {user ? (
              <NavLink
                to="/book-laundry"
                className={({ isActive }) =>
                  isActive ? "text-(--primary) font-semibold" : "text-white"
                }
              >
                Book Laundry
              </NavLink>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <UserAvatar />
            ) : (
              <>
                <div className="hidden md:flex gap-4 items-center text-xs">
                  <Link
                    to="/signup"
                    className="text-white bg-(--primary) px-4 py-2 rounded-full"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-(--primary) border border-(--primary) px-4 py-2 rounded-full"
                  >
                    Log In
                  </Link>
                </div>
              </>
            )}
            <div className="md:hidden">
              <Drawer handleLogout={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
