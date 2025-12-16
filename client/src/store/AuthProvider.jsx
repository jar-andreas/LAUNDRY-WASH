import { AuthProviderContext } from "@/hooks/useAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getAuthUser, logoutUser, refreshAccessToken } from "@/api/auth";
import LazySpinner from "@/components/LazySpinner";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [bookingForm, setBookingForm] = useState(() => {
    const persistedState = localStorage.getItem("laundryBookingForm");
    return persistedState ? JSON.parse(persistedState) : null;
  });
  const queryClient = useQueryClient();

  const refreshTokenAction = useCallback(async () => {
    try {
      const res = await refreshAccessToken();
      if (res?.status === 200 && res.data?.data) {
        setAccessToken(res.data.data);
        return res.data.data;
      }
      setAccessToken(null);
      setUser(null);
      return null;
    } catch (error) {
      import.meta.env.DEV && console.error("Error refreshing token:", error);
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let needsRefresh = false;
    if (!accessToken) {
      refreshTokenAction();
      return;
    }
    try {
      const decodedToken = jwtDecode(accessToken);
      const expirationTime = decodedToken?.exp ?? 0;
      const currentTime = Date.now();
      const refreshBuffer = 2 * 60 * 1000;
      const msUntilExpiry = expirationTime * 1000 - currentTime;
      if (msUntilExpiry <= refreshBuffer) {
        needsRefresh = true;
      }
    } catch {
      needsRefresh = true;
    }
    if (needsRefresh) {
      refreshTokenAction();
      return;
    }
    //if token is valid and not expiring soon fetch user
    setIsAuthenticating(true);
    async function fetchUser() {
      try {
        const res = await getAuthUser(accessToken);
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error(error);
        //if error force refresh token
        await refreshTokenAction();
      } finally {
        setIsAuthenticating(false);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // //refresh accessToken
  // const refresh = useQuery({
  //   queryKey: ["refresh_token"],
  //   queryFn: async () => {
  //     const res = await refreshAccessToken();
  //     if (res.status === 200) {
  //       setAccessToken(res.data.data);
  //     } else {
  //       setAccessToken(null);
  //     }
  //     return res;
  //   },
  //   enabled: !accessToken,
  //   retry: false,
  // });
  // //fetch auth user
  // const { isPending } = useQuery({
  //   queryKey: ["auth_user", accessToken],
  //   queryFn: async () => {
  //     const res = await getAuthUser(accessToken);
  //     if (res.status === 200) {
  //       setUser(res.data.data);
  //     } else {
  //       setUser(null);
  //     }
  //     return res;
  //   },
  //   enabled: !!accessToken, //runs only when there is an accessToken
  // });

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Logout Successful");
      queryClient.clear();
      setAccessToken(null);
      setUser(null);
    },
    onError: (err) => {
      import.meta.env.DEV && console.error(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response.data ||
          "Something went wrong"
      );
    },
  });

  const handleLogout = async () => mutation.mutate(accessToken);

  if (isAuthenticating) {
    return <LazySpinner />;
  }

  const contextValue = {
    accessToken,
    user,
    setAccessToken,
    setUser,
    bookingForm,
    setBookingForm,
    handleLogout,
  };
  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}
