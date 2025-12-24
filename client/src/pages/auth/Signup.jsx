import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateRegisterUserSchema } from "../../utils/dataSchema";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Signup() {
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateRegisterUserSchema),
  });

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration Successful");
      //save access token and redirect user to home page
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || error?.response.data || "Registration failed");
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[461px] w-full lg:mt-8 mx-auto shadow px-6 py-6">
      <h1 className="font-semibold text-2xl text-white mt-18 md:mt-40 lg:mt-0">Create Account</h1>
      <p className="text-white">Enter your Information To Create An Account</p>
      <form className="mt-4" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <label>
            <span className="text-white text-xs">Fullname</span>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullname")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
            />
          </label>
          <p className="text-red-500 text-xs mt-1">
            {errors.fullname?.message}
          </p>
        </div>
        <div className="mb-4">
          <label>
            <span className="text-white text-xs">Email</span>
            <input
              type="email"
              placeholder="Johndoe@email.com"
              {...register("email")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
            />
          </label>
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label>
            <span className="text-white text-xs">Phone Number</span>
            <input
              type="tel"
              placeholder="+23412345678"
              {...register("phone")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
            />
          </label>
          <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
        </div>
        <div className="relative mb-4">
          <span className="text-white text-xs">Password</span>
          <input
            type={revealPassword ? "text" : "password"}
            placeholder="Enter your password here"
            {...register("password")}
            className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
          <button
            className="absolute inset-y-9 right-3 z-10"
            onClick={togglePasswordReveal}
          >
            {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-(--primary) text-white text-xs w-full py-3 mt-10 rounded-full flex justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <Loader className="animate-spin" size={18} />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <p className="text-white text-center mt-4">
        Already have an account?
        <Link to="/login" className="text-(--primary)">
          Sign In
        </Link>
      </p>
    </div>
  );
}
