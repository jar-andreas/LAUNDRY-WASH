import { useAuth } from "@/hooks/useAuth";
import { resendVerifyToken } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { Link } from "react-router";

export default function CheckVerification() {
  const { user, accessToken } = useAuth();

  const sendVerifyToken = useMutation({
    mutationFn: resendVerifyToken,
    onSuccess: (res) => {
      toast.success(
        res?.data?.message || "Verification link has been sent to your email"
      );
    },
    onError: (err) => {
      import.meta.env.DEV && console.error(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response.data ||
          "Something went wrong, please try again"
      );
    },
  });

  const handleResend = async () => {
    sendVerifyToken.mutate(accessToken);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        {user?.isEmailVerified ? (
          <div className="max-w-[800px] mx-auto text-center text-white">
            <img
              src="/images/awesome.svg"
              alt="success"
              className="w-full h-[300px]"
            />
            <h1 className="text-2xl font-bold">Congratulations!</h1>
            <p>Your account has been verified</p>
            <Link to="/">
              <button className="btn btn-lg bg-primary text-white font-bold cursor-pointer my-8 rounded-full w-[153px]">
                Continue
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-w-[800px] mx-auto text-center text-white">
            <img
              src="/images/warning.svg"
              alt="success"
              className="w-full h-[300px]"
            />
            <h1 className="text-2xl font-bold">OOPS!</h1>
            <p>Your account has not been verified</p>
            <button
              className="btn btn-lg bg-primary text-white font-bold cursor-pointer my-8 rounded-full w-[211px]"
              onClick={handleResend}
              disabled={sendVerifyToken.isPending}
            >
              {sendVerifyToken.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Get verification Link"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
