import { useNavigate } from "react-router";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer">
      <img
        src="/images/Frame 2.png"
        alt="logo"
        className="w-[215px] md:auto"
        onClick={() => navigate("/")}
      />
    </div>
  );
}