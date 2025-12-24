import React from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="text-white text-center py-4 space-y-4 mt-20">
            <h1 className="text-3xl">Quick. Clean. Delivered.</h1>
            <p>
              Laundry Wash helps you save time with fast, reliable pickup and
              delivery service.
              <br /> Because you deserve clean clothes without the wait.
            </p>
          </div>
          <div className="flex gap-4 justify-center items-center text-xs">
            <Link
              to="/book-laundry"
              className="text-white bg-(--primary) px-4 py-2 rounded-full"
            >
              Book Laundry
            </Link>
            {!user && (
              <Link
                to="/login"
                className="text-(--primary) border border-(--primary) px-4 py-2 rounded-full"
              >
                Log In
              </Link>
            )}
          </div>
          <div>
            <img src="/images/Frame 30.png" alt="" className="w-full" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 bg-(--Nav)">
        <div className="px-4 py-6 flex flex-col md:flex-row gap-6 text-center md:text-start md:gap-[170px] lg:gap-[300px] items-center">
          <Link className="text-white text-xs px-4 py-2 bg-(--primary) rounded-full">
            <button className="">Services</button>
          </Link>

          <div className="text-white">
            <h1 className="text-xl">Expert Care for Every Fabric</h1>
            <p className="my-4">
              From gentle dry cleaning to precise ironing and everyday wash &
              fold — Obi Laundry handles your clothes with the care they
              deserve.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 bg-(--servicebg) rounded-lg p-2">
            <img src="/images/image 7.png" alt="wash & fold" />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">Wash & Fold</h3>
              <p className="text-sm">
                The ultimate time saver. We handle the washing, drying, and
                precise folding of your everyday clothes. They come back fresh,
                clean, and ready to go straight into your drawers.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-(--servicebg) rounded-lg p-2">
            <img src="/images/image 8.png" alt="dry cleaning" />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">Dry Cleaning</h3>
              <p className="text-sm">
                Professional dry cleaning that keeps your clothes looking new.
                From delicate silks to sharp suits, every item gets premium
                treatment.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-(--servicebg) rounded-lg p-2">
            <img
              src="/images/Gemini_Generated_Image_22qgbq22qgbq22qg.png"
              alt="pickup"
            />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">Pickup & Delivery</h3>
              <p className="text-sm">
                Schedule pick-up online; we collect your items, process them
                with care, and deliver them back to your door at your chosen
                time. This service is included with all options below.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 mt-6">
        <div className="text-white text-center py-4 space-y-6">
          <div>
            <Link className="text-white text-xs px-4 py-2 bg-(--primary) rounded-full">
              How It Works
            </Link>
          </div>
          <h1 className="text-3xl">Expert Care for Every Fabric</h1>
          <p className="mx-0 lg:mx-60">
            From gentle dry cleaning to precise ironing and everyday wash & fold
            — Obi Laundry handles your clothes with the care they deserve.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-6">
          <div className="col-span-12 md:col-span-4 text-center flex flex-col items-center">
            <img src="/images/calendar.png" alt="schedule your services" />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Schedule Your Service
              </h3>
              <p className="text-sm text-gray-300">
                Use our platform or app to select your service (Wash & Fold, Dry
                Cleaning, etc.) and choose a convenient pick-up and delivery
                time.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 text-center flex flex-col items-center">
            <img src="/images/keyhole.png" alt="keyhole" />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">We Clean & Care</h3>
              <p className="text-sm text-gray-300">
                Our team collects your items, pre-treats stains, and cleans your
                garments using professional, eco-friendly methods. Everything is
                carefully folded and packaged.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 text-center flex flex-col items-center">
            <img src="/images/delivery.png" alt="delivery" />
            <div className="text-white mt-4">
              <h3 className="text-lg font-semibold mb-2">We Deliver</h3>
              <p className="text-sm text-gray-300">
                We deliver your fresh, clean, and neatly packaged laundry right
                back to your door. Laundry done!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 mt-6 space-y-6 flex flex-col md:flex-row gap-8 items-center w-full">
        <div className="text-white space-y-4 md:w-[50%] text-center md:text-start">
          <div>
            <Link className="text-xs px-4 py-2 bg-(--primary) rounded-full">
              Who We Are
            </Link>
          </div>
          <h2 className="text-2xl lg:text-3xl font-medium mt-6">
            Reclaiming Your Time with <br /> Professional Laundry <br />{" "}
            Solutions
          </h2>

          <p className="text-gray-300">
            We started Obiwan Laundry with one simple mission: to end the
            endless chore of laundry. We understand that your time is valuable,
            and laundry day shouldn't consume your evenings and weekends.
          </p>
        </div>
        <div className="md:w-[50%]">
          <img
            src="/images/whoweare.png"
            alt="laundry facility"
            className="rounded-2xl object-cover shadow-xl"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 mt-6 space-y-6">
        <div className="text-white text-center py-4 space-y-6">
          <h1 className="text-3xl">What Our Customers Say About Us</h1>
          <p className="mx-0 lg:mx-60">
            Real experiences from people who trust us with their clothes every
            week.
          </p>
          <section className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 py-15">
            <div className="bg-(--servicebg) cardGradient rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm  bg-(--servicebg) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="/images/rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--primary) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="/images/user.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div className="bg-(--servicebg) cardGradient rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm  bg-(--servicebg) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="/images/rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--primary) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="/images/user.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div className="bg-(--servicebg) cardGradient rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm bg-(--servicebg) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="/images/rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--primary) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="/images/user.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="container mx-auto bg-(--Nav)">
        <div className="md:mt-6 space-y-6 flex flex-col md:flex-row md:gap-20 items-center w-full">
          <div className="w-full md:w-[50%]">
            <img
              src="/images/Rectangle 10.png"
              alt="laundry facility"
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>
          <div className="text-white space-y-4 w-full text-center md:text-start md:w-[50%]  px-4">
            <h1 className="text-2xl lg:text-3xl font-bold mt-6">
              Laundry Made <br /> Effortless
            </h1>

            <p className="text-gray-300">
              Fresh, clean, perfectly folded—right <br /> when you need it.
            </p>
            <div>
              <Link
                to="/book-laundry"
                className="text-xs py-4 bg-(--primary) rounded-full"
              >
                <button className="cursor-pointer mt-4 w-full">
                  Book Laundry
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
