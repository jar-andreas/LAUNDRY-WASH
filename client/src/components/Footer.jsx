import { useAuth } from "@/hooks/useAuth";
export default function Footer() {
  const { user } = useAuth();
  return (
    <>
      <div className="container mx-auto px-4 py-6 bg-(--servicebg) mt-18">
        <div className="flex flex-col mt-6 md:flex-row items-center justify-between text-xs text-white space-y-4">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src="/images/Frame 1.png"
                alt="Obiwan Laundry"
                className="md:w-[20%]"
              />
              <p className="text-(--primary) text-sm font-semibold">
                Obiwan Laundry
              </p>
            </div>
          ) : (
            <img
              src="/images/Frame 2.png"
              alt="Default Logo"
              className="md:w-[12%]"
            />
          )}
          <button>Home</button>
          <button>About Us</button>
          <button>Services</button>
          <button>Contact Us</button>
        </div>
        <div className="flex flex-col text-center md:text-start mt-6 md:flex-row items-center justify-between space-y-4">
          <div>
            <p className="text-white/40 text-xs">CONTACT</p>
            <span className="text-sm text-white">+1 891 989-11-91</span>
          </div>
          <div>
            <p className="text-white/40 text-xs">EMAIL</p>
            <span className="text-sm text-white">info@obiwanlaundry.com</span>
          </div>
          <div>
            <p className="text-white/40 text-xs">ADDRESS</p>
            <span className="text-sm text-white">
              2972 Westheimer Rd. Santa Ana, Agege Motor Road
            </span>
          </div>
          <div>
            <img
              src="/images/Frame 31.png"
              alt=""
              className="hidden md:block"
            />
          </div>
        </div>
        <div className="space-y-4">
          <hr className="text-(--primary)" />
          <img src="/images/bottom.png" alt="" />
        </div>
      </div>
    </>
  );
}
