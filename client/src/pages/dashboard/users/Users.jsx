import { getAllUsers } from "@/api/admin";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import UserTable from "./UserTable";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";


export default function Users() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getAllUsers", searchParams.toString()],
    queryFn: () => getAllUsers(searchParams, accessToken),
  });


  const { users, pagination, totalUsers, recentUsers } = data?.data?.data || {};

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  return (
    <div className="container p-4 mx-auto text-white mt-4">
      <h1 className="text-lg font-bold mb-10">Users</h1>
      {isPending ? (
        <DashboardCardSkeleton />
      ) : isError ? (
        <div role="alert" className="alert alert-error alert-soft">
          <span>
            Error!
            {error?.response?.data?.message ||
              error?.response?.data ||
              "Failed to fetch users"}
          </span>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-12 justify-between items-center gap-5 mt-5 mb-14">
            <div className="col-span-12 md:col-span-6 lg:col-span-6 px-3 py-2 bg-(--adminOrderBg) rounded-xl">
              <span className="flex gap-2 items-center ">
                <img
                  src="/images/UserFrame.png"
                  alt="cart-icon"
                  className="bg-white rounded-full p-1 w-10 h-10"
                />
                <p className="text-1xl">Total Users</p>
              </span>
              <div className="mt-5 text-3xl font-semibold">{totalUsers}</div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6 px-3 py-2 bg-(--adminUserBg) rounded-xl">
              <span className="flex gap-2 items-center ">
                <img
                  src="/images/UserFrame.png"
                  alt="user-icon"
                  className="bg-white rounded-full p-1 w-10 h-10"
                />
                <p className="text-1xl">Recent Users</p>
              </span>
              <div className="mt-5 text-3xl font-semibold">{recentUsers}</div>
            </div>
          </div>
          <div>
            <UserTable presentUsers={users} />
          </div>
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
