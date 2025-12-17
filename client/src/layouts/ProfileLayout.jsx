import { Outlet, NavLink } from "react-router";
import { profileLinks } from "@/utils/constants";
import Logout from "@/components/Logout";
import Footer from "@/components/Footer";
import UploadAvatar from "@/pages/profile/UploadAvatar";

export default function ProfileLayout() {
  return (
    <>
      <div className="container mx-auto py-8 px-4 bg-(--servicebg)">
        <UploadAvatar />
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
