import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { Suspense } from "react";
import LazySpinner from "@/components/LazySpinner";

const AuthTwoLayout = lazy(() => import("../layouts/AuthTwoLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const BookingLayout = lazy(() => import("../layouts/BookingLayout"));
const ProfileLayout = lazy(() => import("../layouts/ProfileLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/Home"));
const ForgotPassword = lazy(() => import("../pages/password/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/password/ResetPassword"));
const VerifyEmail = lazy(() => import("../pages/verify-email/VerifyEmail"));
const CheckVerification = lazy(() =>
  import("../pages/verify-email/CheckVerification")
);
const BookLaundry = lazy(() => import("../pages/booking/BookLaundry"));
const BookingSummary = lazy(() => import("../pages/booking/BookingSummary"));
const PaymentOptions = lazy(() => import("../pages/payment/PaymentOptions"));
const Orders = lazy(() => import("../pages/orders/Orders"));
const PersonalInfo = lazy(() => import("../pages/profile/PersonalInfo"));
const Payments = lazy(() => import("../pages/payments/Payments"));
const Dashboard = lazy(() => import("../pages/dashboard/admindashboard/Dashboard"));
const Users = lazy(() => import("../pages/dashboard/users/Users"));
const AdminOrders = lazy(() => import("../pages/dashboard/adminorders/AdminOrders"));
const Revenue = lazy(() => import("../pages/dashboard/revenue/Revenue"));

export default function AppRoutes() {
  const { accessToken } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoute accessToken={accessToken}>
            <AuthLayout />
          </PublicRoute>
        </Suspense>
      ),
      children: [
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoute accessToken={accessToken}>
            <AuthTwoLayout />
          </PublicRoute>
        </Suspense>
      ),
      children: [
        {
          path: "/auth/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/auth/reset-password",
          element: <ResetPassword />,
        },
      ],
    },

    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <ProfileLayout />
              </PrivateRoute>
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <PersonalInfo />
                </PrivateRoute>
              ),
            },
            {
              path: "orders",
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <Orders />
                </PrivateRoute>
              ),
            },
            {
              path: "payments",
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <Payments />
                </PrivateRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "verify-email/:userId/:verifyTokenLink",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <VerifyEmail />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      path: "verify-email",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <CheckVerification />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <BookingLayout />
          </PrivateRoute>
        </Suspense>
      ),
      children: [
        {
          path: "book-laundry",
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <BookLaundry />
              </PrivateRoute>
            </Suspense>
          ),
          children: [
            {
              path: "booking-summary",
              element: (
                <Suspense fallback={<LazySpinner />}>
                  <PrivateRoute accessToken={accessToken}>
                    <BookingSummary />
                  </PrivateRoute>
                </Suspense>
              ),
            },
            {
              path: "payment-options/:bookingId",
              element: (
                <Suspense fallback={<LazySpinner />}>
                  <PrivateRoute accessToken={accessToken}>
                    <PaymentOptions />
                  </PrivateRoute>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "admin",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <AdminLayout />
          </PrivateRoute>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "users",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Users />
            </PrivateRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <AdminOrders />
            </PrivateRoute>
          ),
        },
        {
          path: "revenue",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Revenue />
            </PrivateRoute>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
