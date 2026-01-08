import { useLocation, useNavigate, useSearchParams } from "react-router";
import UserAvatar from "./UserAvatar";
import { useDebouncedCallback } from "use-debounce";
import AdminDrawer from "./AdminDrawer";
import { useAuth } from "@/hooks/useAuth";

export default function AdminNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const debouncedFn = useDebouncedCallback((e) => {
    e.preventDefault();
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value.length >= 3) {
      params.set("query", value);
      navigate(location.pathname + "?" + params.toString());
    } else {
      navigate(location.pathname);
      params.delete("query");
      setSearchParams(params);
    }
    setSearchParams(params);
  }, 500);
  return (
    <div className="sticky top-0 w-full bg-(--servicebg) p-4 z-40">
      <div className="container mx-auto flex items-center gap-3 md:gap-0 md:justify-between">
        <label className="input bg-zinc-600  rounded-lg">
          <svg
            className="h-[1em] opacity-70 text-zinc-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="input-lg text-zinc-300"
            defaultValue={query}
            onChange={debouncedFn}
          />
        </label>
        <div className="flex items-center gap-4">
          <UserAvatar />
          <AdminDrawer handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
