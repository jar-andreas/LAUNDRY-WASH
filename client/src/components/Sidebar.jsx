import Logo from "./Logo";
import { adminLinks } from "@/utils/constants";
import { NavLink } from "react-router";
import Logout from "./Logout";

export default function Sidebar() {
  return (
    <aside className="hidden bg-(--servicebg) lg:block min-h-screen fixed z-40 w-[200px]">
      <div className="p-4">
        <Logo />
      </div>
      <div className="h-[calc(100vh-150px)] p-4 text-white">
        {adminLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-lg mb-3 ${
                isActive ? "bg-(--primary)" : "hover:text-(--primary)"
              }`
            }
            end
          >
            <link.icon />
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="p-4 text-white">
        <Logout />
      </div>
    </aside>
  );
}
