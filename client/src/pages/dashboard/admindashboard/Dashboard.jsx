import { Funnel } from "lucide-react";
import { dashboardStats } from "@/api/admin";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/utils/constants";
import { useSearchParams } from "react-router";
import DashboardTable from "./DashboardTable";
import Paginate from "@/components/Paginate";
import usePaginate from "@/hooks/usePaginate";
import Filter from "./Filter";

export default function Dashboard() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["dashboardStats", searchParams.toString()],
    queryFn: () => dashboardStats(searchParams, accessToken),
  });

  const {
    ordersCount,
    usersCount,
    paymentsTotal,
    recentActivities,
    pagination,
  } = data?.data?.data || {};

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.page || 1,
  });

  return (
    <div className="container p-4 mx-auto text-white mt-4">
      <h1 className="text-lg font-bold mb-10">Dashboard</h1>
      {isPending ? (
        <DashboardCardSkeleton />
      ) : isError ? (
        <div role="alert" className="alert alert-error alert-soft">
          <span>
            Error!
            {error?.response?.data?.message ||
              error?.response?.data ||
              "Failed to fetch data"}
          </span>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-12 justify-between items-center gap-5 mt-5">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 px-3 py-2 bg-(--adminOrderBg) rounded-xl">
              <span className="flex gap-2 items-center ">
                <img
                  src="/images/cart.png"
                  alt="cart-icon"
                  className="bg-white rounded-full p-1 w-10 h-10"
                />
                <p className="text-1xl">Orders</p>
              </span>
              <div className="mt-5 text-3xl font-semibold">{ordersCount}</div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 px-3 py-2 bg-(--adminUserBg) rounded-xl">
              <span className="flex gap-2 items-center ">
                <img
                  src="/images/UserFrame.png"
                  alt="user-icon"
                  className="bg-white rounded-full p-1 w-10 h-10"
                />
                <p className="text-1xl">Users</p>
              </span>
              <div className="mt-5 text-3xl font-semibold">{usersCount}</div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 px-3 py-2 bg-(--adminRevenueBg) rounded-xl">
              <span className="flex gap-2 items-center ">
                <img
                  src="/images/Revenue.png"
                  alt="revenue-icon"
                  className="bg-white rounded-full p-1 w-10 h-10"
                />
                <p className="text-1xl">Revenue</p>
              </span>
              <div className="mt-5 text-3xl font-semibold">
                {formatCurrency(paymentsTotal)}
              </div>
            </div>
          </div>
          {/* RECENT ACTIVITIES */}
          <div className="mt-10 flex items-center justify-between mb-10">
            <p>Recent Activites</p>
            <Filter />
          </div>
          <DashboardTable recentActivities={recentActivities} />
          <Paginate
            totalPages={totalPages}
            hasMore={hasMore}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalItems={pagination?.total}
          />
        </div>
      )}
    </div>
  );
}
