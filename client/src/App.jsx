import AppRoutes from "./routes/AppRoutes";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/AuthProvider";
import { detectCookiesBlocked } from "./utils/cookieCheck";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();
function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const checkCookies = () => {
      const blocked = detectCookiesBlocked();
      setShowCookieBanner(blocked);
    };
    //check immediately
    checkCookies();
    //check periodically (every 30 seconds) in case user enables cookies
    const interval = setInterval(checkCookies, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {showCookieBanner && (
        <CookieBanner onDismiss={() => setShowCookieBanner(false)} />
      )}
      {showCookieBanner}
      <ToastContainer position="bottom-center" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
