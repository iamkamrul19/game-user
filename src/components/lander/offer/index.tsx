"use client";

import BreadCrumbs from "@/components/common/breadcrumbs";
import TimerCard from "@/components/common/TimerCard";
import { useGeMonthlytOfferListQuery } from "@/redux/api/offerApi";
import React from "react";
import NoData from "@/components/common/NoData";
import MonthlyOfferCard from "./MonthlyOfferCard";
import { IMonthlyOffer, IMonthlyOfferGame } from "@/types";
import { useCountdownTimer } from "@/hooks/useCountdowTimer";
import { Skeleton } from "@/components/ui/skeleton";
import MonthlyOfferSkeleton from "./MonthlyOfferSkeleton";
import { isToday } from "@/utils";

const Offer = () => {
  const { data, isLoading, isFetching } = useGeMonthlytOfferListQuery();
  const offer = data?.data || ({} as IMonthlyOffer);
  const latestGame =
    offer?.games?.findLast((item) => isToday(item?.offer_date)) ||
    ({} as IMonthlyOfferGame);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  const { hours, days, minutes, seconds } = useCountdownTimer(
    todayStart,
    todayEnd
  );
  const loading = isLoading || isFetching;
  return (
    <>
      <section
        className="h-auto bg-cover bg-center bg-no-repeat pb-10 lg:pb-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.17) 100%), url('/offer-bg.png')`,
        }}
      >
        <div className="main-container pt-[100px]">
          <BreadCrumbs links={["Offer"]} />
          <div className="mt-10 bg-[#1C1C1C] border-[1px] border-white/20 rounded-[16px] overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-8 lg:px-10 py-4 lg:py-5 bg-[#232323E5]">
              <div className="max-w-[615px]">
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <h3 className="text-white text-[20px] leading-[30px] font-poppins font-semibold">
                    {/* <span className="bg-gradient-to-r from-[#F8C431] to-[#FF6400] bg-clip-text text-transparent">
                    30 Days, 30 Games
                  </span>{" "}
                  A Daily Adventure Awaits! */}
                    {offer?.title || ""}
                  </h3>
                )}
                {loading ? (
                  <Skeleton className="h-2.5 lg:min-w-[500px] max-w-[500px] mt-2" />
                ) : (
                  <p className="text-[#A1A1A1] text-[13px] leading-[12px] font-inter mt-1">
                    {offer?.description || ""}
                  </p>
                )}
              </div>
              {latestGame?.offer_date && (
                <div className="flex flex-col lg:flex-row lg:items-center gap-3.5">
                  <p className="text-[12px] leading-[18px] font-semibold font-inter text-white">
                    Next offer will start
                  </p>
                  <div className="flex items-center gap-1.5">
                    <TimerCard
                      className="bg-white/20 backdrop-blur-[10px]"
                      title="DAY"
                      value={days}
                    />
                    <TimerCard
                      className="bg-white/20 backdrop-blur-[10px]"
                      title="HR"
                      value={hours}
                    />
                    <TimerCard
                      className="bg-white/20 backdrop-blur-[10px]"
                      title="MIN"
                      value={minutes}
                    />
                    <TimerCard
                      className="bg-white/20 backdrop-blur-[10px]"
                      title="SEC"
                      value={seconds}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="backdrop-blur-[30px] bg-[#1C1C1C] rounded-b-[16px] mb-8">
              {isLoading || isFetching ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full w-full">
                  <MonthlyOfferSkeleton />
                  <MonthlyOfferSkeleton />
                  <MonthlyOfferSkeleton />
                  <MonthlyOfferSkeleton />
                </div>
              ) : offer?.games?.length > 0 ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full w-full">
                  {offer?.games?.map((item, index) => (
                    <MonthlyOfferCard key={index} item={item} />
                  ))}
                </div>
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offer;
