import Filter from "@/pages/dashboard/adminorders/Filter";
import AdminOrdersTable from "./AdminOrdersTable";
import { getAllOrders } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import usePaginate from "@/hooks/usePaginate";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import Paginate from "@/components/Paginate";

export default function AdminOrders() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getAllOrders", searchParams.toString()],
    queryFn: () => getAllOrders(searchParams, accessToken),
  });

  const {
    activeOrders,
    inProgressOrders,
    completedOrders,
    canceledOrders,
    orders,
    pagination,
  } = data?.data?.data || {};

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  return (
    <div className="container p-4 mx-auto text-white mt-4">
      <h1 className="text-lg badge font-bold mb-10">Orders</h1>

      {isPending ? (
        <DashboardCardSkeleton />
      ) : isError ? (
        <div role="alert" className="alert alert-error alert-soft">
          <span>
            Error!{" "}
            {error?.response?.data?.message ||
              error?.response?.data ||
              "Failed to fetch data"}
          </span>
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-12 justify-between items-center gap-5 mt-5">
              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-(--adminOrderBg) rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/cart.png"
                    alt="cart-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Active</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {activeOrders}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-(--adminUserBg) rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/UserFrame.png"
                    alt="user-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">In Progress</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {inProgressOrders}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-(--adminRevenueBg) rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/Revenue.png"
                    alt="revenue-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Completed</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {completedOrders}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-red-700 rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/Revenue.png"
                    alt="revenue-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Canceled</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {canceledOrders}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between mb-10">
              <p>Recent Activites</p>
              <Filter />
            </div>
          </div>
          <AdminOrdersTable orders={orders} />
          <Paginate
            totalPages={totalPages}
            hasMore={hasMore}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalItems={pagination?.total}
          />
        </>
      )}
    </div>
  );
}
