import { useAuth } from "@/hooks/useAuth";
import { Pencil } from "lucide-react";
import { Outlet, NavLink } from "react-router";
import { profileLinks } from "@/utils/constants";
import Logout from "@/components/Logout";
import Footer from "@/components/Footer";

export default function ProfileLayout() {
  const { user } = useAuth();
  return (
    <>
      <div className="container mx-auto py-8 px-4 bg-(--servicebg)">
        <div className="container mx-auto px-4 py-10 mt-20 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="avatar avatar-placeholder">
              <div className="text-neutral-content w-24 rounded-full bg-black">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.fullname} loading="lazy" />
                ) : (
                  <span className="text-xl">
                    {user?.fullname
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">{user?.fullname}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          <div>
            <Pencil className="text-white" />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 px-4 md:grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col gap-2 text-white">
          {profileLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-lg ${
                  isActive ? "bg-(--primary)" : ""
                }`
              }
              end
            >
              <link.icon />
              {link.label}
            </NavLink>
          ))}
          <Logout />
        </div>
        <div className="mt-10 md:mt-0 col-span-9">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
