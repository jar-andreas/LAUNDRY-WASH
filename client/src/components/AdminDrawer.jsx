import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
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
              <div className="mt-8 text-white">
                <h1 className="font-semibold  text-xl capitalize">
                  Hi, {user.fullname}
                </h1>
                <div className="mt-4 flex flex-col gap-3">
                  <NavLink
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `transition-all duration-300 ease-in p-3 font-medium text-xl rounded-lg mb-3 ${
                        isActive ? "bg-(--primary)" : "hover:text-(--primary)"
                      }`
                    }
                    end
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/admin/orders"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `transition-all duration-300 ease-in p-3 font-medium text-xl rounded-lg mb-3 ${
                        isActive ? "bg-(--primary)" : "hover:text-(--primary)"
                      }`
                    }
                    end
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/admin/revenue"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `transition-all duration-300 ease-in p-3 font-medium text-xl rounded-lg mb-3 ${
                        isActive ? "bg-(--primary)" : "hover:text-(--primary)"
                      }`
                    }
                    end
                  >
                    Revenue
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `transition-all duration-300 ease-in p-3 font-medium text-xl rounded-lg mb-3 ${
                        isActive ? "bg-(--primary)" : "hover:text-(--primary)"
                      }`
                    }
                    end
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/admin/deliveries"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `transition-all duration-300 ease-in p-3 font-medium text-xl rounded-lg mb-3 ${
                        isActive ? "bg-(--primary)" : "hover:text-(--primary)"
                      }`
                    }
                    end
                  >
                    Deliveries
                  </NavLink>
                  
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="font-medium text-xl p-3 2hover:text-(--primary) transition-all duration-300 ease-in"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
