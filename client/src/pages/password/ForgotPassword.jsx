import React from "react";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateForgotPasswordSchema } from "@/utils/dataSchema";
import { forgotPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function ForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateForgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration Successful");
      //save access token and redirect user to home page
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response.data ||
          "Registration failed"
      );
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <div className="w-full max-w-[410px] flex flex-col">
        <h2 className="text-white text-xl font-semibold">Forgot Password</h2>
        <p className="text-gray-200 text-sm mt-1 mb-6">
          Enter Your Information
        </p>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label>
              <span className="text-white text-xs">Email</span>
              <input
                type="email"
                placeholder="Johndoe@email.com"
                {...register("email")}
                className="input input-md w-full bg-white text-xs py-2 px-2 rounded-lg"
              />
            </label>
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>
          <button
            type="submit"
            className="bg-(--primary) text-white text-xs w-full py-3 mt-10 rounded-full flex justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} />
                Next
              </>
            ) : (
              "Next"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
