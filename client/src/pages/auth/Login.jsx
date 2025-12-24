import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLoginUserSchema } from "@/utils/dataSchema";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginUserSchema),
  });

  const { setAccessToken } = useAuth();

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login Successful");
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || error?.response.data || "Login failed");
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[461px] mx-auto w-full lg:mt-30 shadow px-4 py-6">
      <h1 className="font-semibold text-2xl text-white mt-30 md:mt-60 lg:mt-0">Welcome Back</h1>
      <p className="text-white">Enter your Details To Continue</p>

      <form className="mt-4" onSubmit={handleSubmit(onSubmitForm)}>
        
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
          <span className="text-white text-xs">Password</span>

          <div className="relative">
            <input
              type={revealPassword ? "text" : "password"}
              placeholder="Enter your password here"
              {...register("password")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg pr-10"
            />

            <button
              type="button"
              onClick={togglePasswordReveal}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 z-10"
            >
              {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>

          <div className="text-end mt-3">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-white/80 hover:text-white"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-(--primary) text-white text-xs w-full py-3 mt-4 rounded-full flex justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <Loader className="animate-spin" size={18} />
              Signing In...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="text-white text-center mt-4">
        Don't have an account?
        <Link to="/signup" className="text-(--primary)">Sign Up</Link>
      </p>
    </div>
  );
}
