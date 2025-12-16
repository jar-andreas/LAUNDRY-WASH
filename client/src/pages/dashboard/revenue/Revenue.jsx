import { useQuery } from "@tanstack/react-query";
import { getOrdersRevenue } from "@/api/admin";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { formatCurrency } from "@/utils/constants";
import usePaginate from "@/hooks/usePaginate";
import RevenueTable from "./RevenueTable";
import Paginate from "@/components/Paginate";
import Filter from "./Filter";

export default function Revenue() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getOrdersRevenue", searchParams.toString()],
    queryFn: () => getOrdersRevenue(searchParams, accessToken),
  });

  const {
    isPaidTotal,
    totalRevenue,
    getPayDelivery,
    getPayPaystack,
    getPayments,
    pagination,
  } = data?.data?.data || {};

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  return (
    <div className="container p-4 mx-auto text-white mt-4">
      <h1 className="text-lg font-bold mb-10">Orders</h1>

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
                  <p className="text-1xl">Paid Orders</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {formatCurrency(isPaidTotal)}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-(--adminUserBg) rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/UserFrame.png"
                    alt="user-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Total Revenue</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {formatCurrency(totalRevenue)}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-(--adminRevenueBg) rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/Revenue.png"
                    alt="revenue-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Pay on Delivery</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {formatCurrency(getPayDelivery)}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3 px-3 py-2 bg-red-700 rounded-xl">
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/Revenue.png"
                    alt="revenue-icon"
                    className="bg-white rounded-full p-1 w-10 h-10"
                  />
                  <p className="text-1xl">Pay with Paystack</p>
                </span>
                <div className="mt-5 text-3xl font-semibold">
                  {formatCurrency(getPayPaystack)}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between mb-10">
              <p>Recent Activites</p>
              <Filter />
            </div>
          </div>
          <RevenueTable payments={getPayments} />
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
