import { getPayments } from "@/api/payment";
import Paginate from "@/components/Paginate";
import { SkeletonTable } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router";
import PaymentTable from "./PaymentTable";
import usePaginate from "@/hooks/usePaginate";

export default function Payments() {
  const tabs = ["Pending", "Confirmed", "Cancelled"];
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = (searchParams.get("status") || "pending").toLowerCase();
  const initialTab =
    tabs.find((tab) => tab.toLowerCase() === statusParam) || "Pending";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { accessToken } = useAuth();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["userPayments", searchParams.toString()],
    queryFn: () => getPayments(searchParams, accessToken),
  });
  const { payments, pagination } = data?.data?.data || {};
  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ status: tabName.toLowerCase(), page: 1 });
  };
  return (
    <div className="px-4 text-white">
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            className={`tab ${
              activeTab === tab ? "tab-active border-b border-(--primary)" : ""
            } text-white `}
            onClick={() => handleTabSwitch(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {isPending ? (
          <SkeletonTable />
        ) : isError ? (
          <>
            <div role="alert" className="alert alert-error alert-soft">
              <span>
                Error!
                {error?.response?.data?.message ||
                  error?.response?.data ||
                  "Failed to fetch payments"}
              </span>
            </div>
          </>
        ) : (
          <>
            {activeTab === "Pending" && (
              <PaymentTable filterPayments={payments} />
            )}
            {activeTab === "Confirmed" && (
              <PaymentTable filterPayments={payments} />
            )}
            {activeTab === "Cancelled" && (
              <PaymentTable filterPayments={payments} />
            )}
            <Paginate
              totalPages={totalPages}
              hasMore={hasMore}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
