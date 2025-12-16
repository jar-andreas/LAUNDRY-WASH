import { useNavigate, useLocation } from "react-router";
import { ChevronRight, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/api/booking";
import { toast } from "react-toastify";
import { itemsPerCost, ITEM_KEYS } from "@/utils/constants";
import Footer from "@/components/Footer";

export default function BookingSummary() {
  const { bookingForm, accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const items = {
    shirt: bookingForm?.shirt,
    trouser: bookingForm?.trouser,
    native: bookingForm?.native,
    senator: bookingForm?.senator,
    duvet: bookingForm?.duvet,
    specialItem: bookingForm?.specialItem,
  };

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (res) => {
      toast.success(res.data.message || "Booking placed Successfully");
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      navigate(`/book-laundry/payment-options/${res.data.data._id}`);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to place booking"
      );
    },
  });

  const placeOrder = async () => {
    mutation.mutate({ formData: bookingForm, accessToken });
  };

  return (
    <>
      <div className="pt-26">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-3 items-center text-white">
            <h1
              className="text-xl md:text-4xl font-semibold cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Book Laundry
            </h1>
            <ChevronRight />
            <h1
              className={`text-xl md:text-4xl font-semibold ${
                path ? "text-(--primary)" : ""
              }`}
              onClick={() => navigate(-1)}
            >
              Book Summary
            </h1>
          </div>
        </div>
        <div className="container mx-auto max-w-[580px] px-4 py-6 space-y-4">
          <div>
            <h2 className=" font-semibold text-white mb-2">
              Service & Pick-Up Information
            </h2>

            <section className="bg-(--servicebg) px-2 py-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Service</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.serviceType}
                </h1>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Address</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.pickUpAddress}
                </h1>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Phone Number</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.pickUpPhone}
                </h1>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Pick-up Date</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.date &&
                    new Date(bookingForm.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </h1>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Pick-up Time</p>
                <h1 className="font-semibold text-sm">{bookingForm?.time}</h1>
              </div>
            </section>
          </div>
          <div>
            <h2 className=" font-semibold text-white mb-1">
              Delivery Information
            </h2>
            <section className="bg-(--servicebg) px-2 py-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Address</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.deliveryAddress}
                </h1>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-xs">Phone Number</p>
                <h1 className="font-semibold text-sm">
                  {bookingForm?.deliveryPhone}
                </h1>
              </div>
            </section>
          </div>
          <div>
            <h2 className=" font-semibold text-white mb-1">Item Information</h2>
            <section className="bg-(--servicebg) px-2 py-4 rounded-lg space-y-2 text-white">
              {ITEM_KEYS.map((key) => {
                const quantity = items[key];
                if (!quantity || Number(quantity) < 1) return null;
                const label =
                  key === "specialItem"
                    ? "Special Item"
                    : key.charAt(0).toUpperCase() + key.slice(1);
                const pricePerItem = itemsPerCost[key];
                return (
                  <div key={key} className="flex justify-between items-center">
                    <p className="text-xs">
                      {label} (&#x20A6;{pricePerItem} per Item)
                    </p>
                    <h1 className="text-sm">{quantity}</h1>
                  </div>
                );
              })}
            </section>
          </div>
          <div>
            <h2 className=" font-semibold text-white mb-1">Pricing</h2>
            <section className="space-y-2">
              <div className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-full">
                <p className="text-xs">Total Price</p>
                <h1 className="font-semibold text-xs">
                  ₦ {bookingForm?.total}
                </h1>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:items-center mt-6">
            <div className="col-span-12 lg:col-span-6 text-center border border-white rounded-full px-4 py-2">
              <button
                type="submit"
                className="text-xs text-white"
                onClick={() => navigate("/book-laundry")}
              >
                Edit
              </button>
            </div>

            <button
              className="col-span-12 cursor-pointer lg:col-span-6 text-center bg-(--primary) px-4 py-3 rounded-full text-xs text-white flex item-center justify-center gap-2"
              onClick={placeOrder}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader className="animate-spin" size={18} /> Confirm Booking
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
