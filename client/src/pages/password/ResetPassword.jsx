import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateResetPasswordSchema } from "@/utils/dataSchema";
import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function ResetPassword() {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateResetPasswordSchema),
  });

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const toggleConfirmPasswordReveal = (e) => {
    e.preventDefault();
    setRevealConfirmPassword((prev) => !prev);
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      toast.success(res.data.message || "Password reset successful");
      navigate("/login");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
    },
  });

  const onSubmitForm = async (data) => {
    const formData = { ...data, userId, token };
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <div className="w-full max-w-[410px] flex flex-col">
        <div>
          <h2 className="text-white text-xl font-semibold">Forgot Password</h2>
          <p className="text-gray-200 text-sm mt-1 mb-6">
            Enter Your Information
          </p>
        </div>

        <div className="mb-4">
          <span className="text-white text-xs">Password</span>

          <div className="relative">
            <input
              type={revealPassword ? "text" : "password"}
              placeholder="Enter your password here"
              {...register("newPassword")}
              className="input input-md w-full bg-white text-xs py-2 px-2 rounded-lg pr-10"
            />

            <button
              type="button"
              onClick={togglePasswordReveal}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
            >
              {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-red-500 text-xs mt-1">
            {errors.newPassword?.message}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <span className="text-white text-xs">Confirm Password</span>

            <div className="relative">
              <input
                type={revealConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="input input-md w-full bg-white text-xs py-2 px-2 rounded-lg pr-10"
              />

              <button
                type="button"
                onClick={toggleConfirmPasswordReveal}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
              >
                {revealConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            className="bg-(--primary) text-white text-xs w-full py-3 mt-10 rounded-full flex justify-center gap-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
