import {
  itemQty,
  pickUpTimeData,
  serviceTypeData,
  itemsPerCost,
  ITEM_KEYS,
} from "@/utils/constants";
import { validateBookingSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { useNavigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function LaundryPickup() {
  const { bookingForm, setBookingForm } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(validateBookingSchema),
    defaultValues: {
      serviceType: bookingForm?.serviceType || "",
      pickUpAddress: bookingForm?.pickUpAddress || "",
      pickUpPhone: bookingForm?.pickUpPhone || "",
      date: bookingForm?.date || "",
      time: bookingForm?.time || "",
      deliveryAddress: bookingForm?.deliveryAddress || "",
      deliveryPhone: bookingForm?.deliveryPhone || "",
      shirt: bookingForm?.shirt || "",
      trouser: bookingForm?.trouser || "",
      senator: bookingForm?.senator || "",
      native: bookingForm?.native || "",
      duvet: bookingForm?.duvet || "",
      specialItem: bookingForm?.specialItem || "",
      total: bookingForm?.total || "",
    },
  });

  const watchedItems = useWatch({
    control,
    name: ITEM_KEYS,
  });

  useEffect(() => {
    const total = ITEM_KEYS.reduce((sum, key, index) => {
      const qty = Number(watchedItems?.[index]) || 0;
      const unitPrice = itemsPerCost[key] || 0;
      return sum + qty * unitPrice;
    }, 0);
    setValue("total", total, { shouldValidate: true });
  }, [watchedItems, setValue]);

  const cancelForm = () => {
    setBookingForm(null);
    localStorage.removeItem("laundryBookingForm");
    reset();
  };

  const onSubmit = async (data) => {
    if (
      !data.pickUpPhone.startsWith("+234") ||
      !data.deliveryPhone.startsWith("+234")
    ) {
      toast.warning(
        "Ensure Pick up and delivery phone begins with intl format"
      );
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.warning("Pick up date cannot be in the past");
      return;
    }

    const items = {
      shirt: data.shirt,
      trouser: data.trouser,
      native: data.native,
      senator: data.senator,
      duvet: data.duvet,
      specialItem: data.specialItem,
    };
    const hasAtLeastOneItem = Object.values(items).some(
      (value) => value !== undefined && value !== "" && Number(value) > 0
    );

    if (!hasAtLeastOneItem) {
      toast.warning("Select at least one item quantity to proceed");
      return;
    }
    localStorage.setItem("laundryBookingForm", JSON.stringify(data));
    setBookingForm(data);
    navigate("/book-laundry/booking-summary");
  };

  return (
    <>
      {path === "/book-laundry" ? (
        <>
          <div className="container mx-auto max-w-[580px] px-4 py-6 space-y-4">
            <div className="container mx-auto max-w-[381px] mt-24">
              <h1 className="text-white text-2xl text-center">
                Book Laundry Pick-Up
              </h1>
            </div>

            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10">
                <h2 className=" font-semibold text-white mb-2">Service Type</h2>
                <div className="bg-(--servicebg) px-2 py-4 rounded-lg">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-white w-full">
                      Select Service
                    </legend>
                    <select
                      defaultValue=""
                      className="select w-full bg-white text-black rounded-sm"
                      {...register("serviceType")}
                    >
                      <option value="" disabled selected>
                        Pick a service
                      </option>
                      {serviceTypeData.map((service, idx) => (
                        <option key={idx} className="w-full">
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  {errors?.serviceType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors?.serviceType?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="container mx-auto">
                <h2 className=" font-semibold text-white mb-2">
                  Pick-Up information
                </h2>
                <div className="bg-(--servicebg) px-2 py-4 rounded-lg">
                  <div>
                    <h2 className="text-xs text-white">Address</h2>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      {...register("pickUpAddress")}
                      className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                    />
                    {errors?.pickUpAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pickUpAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <h2 className="text-xs text-white">Phone Number</h2>
                    <input
                      type="tel"
                      placeholder="+234803878218"
                      {...register("pickUpPhone")}
                      className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                    />
                    {errors?.pickUpPhone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pickUpPhone.message}
                      </p>
                    )}
                  </div>

                  {/* <div className="grid grid-cols-12 gap-4 lg:items-center mt-2">
                    <div className="col-span-12 lg:col-span-6">
                      <span className="text-xs text-white">Pick-up Date</span>
                      <input
                        type="date"
                        {...register("date")}
                        className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                      />
                      {errors?.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-12 lg:col-span-6">
                      <span className="text-xs text-white">Pick-up Time</span>
                      <select
                        className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                        {...register("time")}
                      >
                        <option value="" disabled selected>
                          Select Pick-up Time
                        </option>

                        {pickUpTimeData.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      {errors?.time && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.time.message}
                        </p>
                      )}
                    </div>
                  </div> */}
                  <div className="grid grid-cols-12 gap-4 lg:items-center mt-2">
                    <div className="col-span-12 lg:col-span-6">
                      <span className="text-xs text-white">Pick-up Date</span>
                      <input
                        type="date"
                        {...register("date")}
                        className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1 h-10"
                      />
                      {errors?.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-12 lg:col-span-6">
                      <span className="text-xs text-white">Pick-up Time</span>
                      <select
                        {...register("time")}
                        defaultValue=""
                        className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1 h-10"
                      >
                        <option value="" disabled>
                          Select Pick-up Time
                        </option>

                        {pickUpTimeData.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      {errors?.time && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.time.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mx-auto">
                <h2 className=" font-semibold text-white mb-2">
                  Delivery information
                </h2>

                <div className="bg-(--servicebg) px-2 py-4 rounded-lg">
                  <div>
                    <span className="text-xs text-white">Address</span>
                    <input
                      type="text"
                      placeholder="Same as pick-up"
                      {...register("deliveryAddress")}
                      className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                    />
                    {errors?.deliveryAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.deliveryAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="text-xs text-white">Phone Number</span>
                    <input
                      type="tel"
                      placeholder="+234803878218"
                      {...register("deliveryPhone")}
                      className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                    />
                    {errors?.deliveryPhone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.deliveryPhone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="container mx-auto">
                <h2 className=" font-semibold text-white mb-2">Add item</h2>

                <div className="grid grid-cols-12 gap-2 lg:items-center mt-2 bg-(--servicebg) px-2 py-4 rounded-lg">
                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Shirt (NGN 900 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("shirt")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Trouser (NGN 700 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("trouser")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Senator (NGN 1,200 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("senator")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Native (NGN 900 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("native")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Duvet (NGN 1,500 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("duvet")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="fieldset col-span-12 lg:col-span-4">
                    <legend className="fieldset-legend text-white">
                      Special Item (NGN 2,000 per)
                    </legend>
                    <select
                      className="select w-full bg-white text-black rounded-sm"
                      defaultValue=""
                      {...register("specialItem")}
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      {itemQty.map((service, idx) => (
                        <option key={idx} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="container mx-auto">
                <h2 className=" font-semibold text-white mb-2">Pricing</h2>
                <div className="bg-(--servicebg) px-2 py-4 rounded-lg">
                  <div>
                    <span className="text-xs text-white">Total Price</span>
                    <input
                      type="number"
                      placeholder="&#x20A6; 0.00"
                      {...register("total")}
                      className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 lg:items-center mt-4">
                <div className="col-span-12 lg:col-span-6 text-center border border-white rounded-full px-4 py-2">
                  <button
                    type="button"
                    className="text-xs text-white"
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>
                </div>

                <button
                  type="submit"
                  className="col-span-12 cursor-pointer lg:col-span-6 text-center bg-(--primary) px-4 py-3 rounded-full text-xs text-white"
                >
                  Proceed To Summary
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
