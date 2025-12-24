import { useAuth } from "@/hooks/useAuth";
import { validateProfileResetSchema } from "@/utils/dataSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";
import { updateProfile } from "@/api/auth";
import { toast } from "react-toastify";

export default function PersonalInfo() {
  const { user, accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateProfileResetSchema),
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      toast.success(res.data.message || "Profile Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["auth_user"] });
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to update profile"
      );
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate({ formData: data, accessToken });
  };

  return (
    <div className="max-w-[580px] mx-auto">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <label>
            <span className="text-white text-xs">Fullname</span>
            <input
              type="text"
              {...register("fullname")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
              defaultValue={user?.fullname || ""}
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
              {...register("email")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
              defaultValue={user?.email || ""}
            />
          </label>
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label>
            <span className="text-white text-xs">Phone Number</span>
            <input
              type="tel"
              {...register("phone")}
              className="input input-md w-full bg-white text-black text-xs py-2 px-2 rounded-lg"
              defaultValue={user?.phone || ""}
            />
          </label>
          <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:items-center mt-8">
          <div className="col-span-12 lg:col-span-6 text-center border border-white rounded-full px-4 py-2">
            <button
              type="button"
              className="text-xs text-white"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
          <button
            className="col-span-12 cursor-pointer lg:col-span-6 text-center bg-(--primary) px-4 py-3 flex justify-center gap-2 rounded-full text-xs text-white"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} /> Save Changes
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
