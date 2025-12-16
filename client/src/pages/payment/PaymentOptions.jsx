import { createPayment } from "@/api/payment";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { payOptions } from "@/utils/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ChevronRight, Loader } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Paystack from "@/components/Paystack";
import Modal from "@/components/Modal";

export default function PaymentOptions() {
  const [selectPayment, setSelectPayment] = useState("Pay on Delivery");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaystack, setShowPaystack] = useState(false);

  const { accessToken, bookingForm, setBookingForm } = useAuth();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();


  const path = location.pathname.split("/")[2];

  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (res) => {
      toast.success(res.data.message || "Payment successful");
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      localStorage.removeItem("laundryBookingForm");
      setBookingForm(null);
      setIsModalOpen(true);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to place booking"
      );
    },
  });

  const makePayment = async () => {
    if (selectPayment === "Pay on Delivery") {
      const formData = {
        amount: bookingForm?.total,
        reference: new Date().getTime().toString(),
        paymentMethod: selectPayment,
      };

      mutation.mutate({ bookingId, formData, accessToken });
    } else {
      setShowPaystack(true);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-3 items-center text-white pt-26">
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
          >
            Payment Options
          </h1>
        </div>

        <div className="max-w-[580px] mx-auto text-white font-semibold text-xl mt-10">
          <h1>Select Payment Option</h1>
        </div>

        <div className="mt-4 flex flex-col items-center w-full">
          {payOptions.map((item) => (
            <div
              key={item.id}
              className="px-4 py-4 bg-servicebg rounded-xl flex text-white justify-between w-full items-center mb-6 max-w-[580px]"
            >
              <div className="flex items-center gap-2">
                <item.icon />
                <p>{item.label}</p>
              </div>

              <input
                type="radio"
                name="radio-1"
                className="radio scale-75 text-(--primary) border border-(--primary) bg-(--servicebg)"
                checked={selectPayment === item.label}
                value={item.label}
                onChange={(e) => setSelectPayment(e.target.value)}
              />
            </div>
          ))}

          <div className="w-full max-w-[580px]">
            <div className="grid grid-cols-12 gap-4 lg:items-center mt-2">
              <div className="col-span-12 lg:col-span-6 text-center border border-white rounded-full px-4 py-2">
                <button
                  type="button"
                  className="text-xs text-white"
                  onClick={() => navigate("/book-laundry")}
                >
                  Cancel
                </button>
              </div>

              <button
                className="col-span-12 cursor-pointer lg:col-span-6 text-center bg-(--primary) px-4 py-3 rounded-full text-xs text-white flex item-center justify-center gap-2"
                onClick={makePayment}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Proceed
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
        {showPaystack && (
          <Paystack
            bookingId={bookingId}
            total={bookingForm?.total}
            setIsModalOpen={setIsModalOpen}
            onClose={() => setShowPaystack(false)}
            selectPayment={selectPayment}
          />
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            id="createPaymentModal"
            classname="bg-(--Nav) p-4 rounded-xl shadow-lg w-[90%] max-w-[400px] mx-auto"
            onClose={() => setIsModalOpen(false)}
          >
            <div className="my-6 flex flex-col justify-center items-center">
              <img
                src="/images/Group.png"
                alt="success"
                className="w-[100px]"
              />

              <div className="mt-4 text-center text-white">
                <h1 className="text-2xl">
                  {selectPayment === "Pay on Delivery"
                    ? "Your payment has been scheduled"
                    : "Your pick-up payment has been made successfully"}
                </h1>

                <p className="text-sm">
                  You will be notified once dispatch is on its way
                </p>

                <div className="mt-6 grid grid-cols-1 gap-2 md:gap-4">
                  <button
                    type="submit"
                    className="bg-(--primary) py-3 text-white w-full rounded-full"
                    onClick={() => navigate("/profile/orders?status=in-progress")}
                  >
                    View orders
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="py-3 text-white w-full rounded-full border border-white"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        
      </div>
      <Footer />
    </>
  );
}
