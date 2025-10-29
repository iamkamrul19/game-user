"use client";

import { useAppSelector } from "@/redux/hooks";
import EmptyCart from "./EmptyCart";
import Summary from "./Summary";
import SummaryBtn from "./SummaryBtn";
import CheckoutItem from "./CheckoutItem";
import { ChangeEvent, useEffect, useMemo } from "react";
import SimilarCard from "./SimilarCard";
import CouponIcon from "@/components/icons/CouponIcon";
import debouce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setCoupon } from "@/redux/slice/checkoutSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    games,
    similar_games,
    official_price,
    coupon_discount,
    discount_price,
    total_price,
    coupon_code,
    cartLoading,
  } = useAppSelector((state) => state.checkout);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setCoupon(value));
  };

  const handlePayment = () => {
    router.push(
      `/checkout/payment${coupon_code ? `?coupon=${coupon_code}` : ""}`
    );
  };

  const debouncedResults = useMemo(() => {
    return debouce(onChange, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
      <div className="flex-1">
        {games?.length ? (
          <div className="flex-1">
            <div className="bg-[#232323] p-8 rounded-[20px]">
              <h4 className="text-white-gradient text-[21px] leading-7 font-black font-inter">
                My cart
              </h4>
              <div className="mt-10 flex flex-col gap-5">
                {games?.map((game) => (
                  <CheckoutItem game={game} key={game.id} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
        <div className="mt-10">
          <h3 className="text-white-gradient text-[21px] leading-7 font-bold font-inter">
            Recommended for you
          </h3>

          <div className="flex flex-col gap-5 mt-9">
            {similar_games?.map((item) => (
              <SimilarCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <Summary className="lg:max-w-[25%]">
        <div className="mt-7">
          <div className="flex flex-col gap-3">
            {games?.length ? (
              <div className="bg-[#161616] border-[1px] border-white/20 rounded-[50px] px-6 py-3 flex items-center gap-2">
                <CouponIcon className="text-white" />
                <input
                  // value={coupon_code}
                  defaultValue={coupon_code}
                  onChange={debouncedResults}
                  type="text"
                  placeholder="coupon code"
                  className="bg-transparent w-full h-full text-[14px] leading-[14px] font-inter font-semibold outline-none text-white"
                />
              </div>
            ) : null}

            <div className="flex justify-between items-center text-[#B8B8B8] text-[15px] leading-7 font-inter font-medium">
              <p>Official Price</p>
              {cartLoading ? (
                <Skeleton className="w-[48px] h-[20px]" />
              ) : (
                <p>{official_price?.toFixed(2)}</p>
              )}
            </div>
            {coupon_code && coupon_discount ? (
              <div className="flex justify-between items-center text-[#B8B8B8] text-[15px] leading-7 font-inter font-medium">
                <p>Coupon Discount</p>
                {cartLoading ? (
                  <Skeleton className="w-[48px] h-[20px]" />
                ) : (
                  <p>{coupon_discount?.toFixed(2)}</p>
                )}
              </div>
            ) : null}
            <div className="flex justify-between items-center text-[#B8B8B8] text-[15px] leading-7 font-inter font-medium">
              <p>Discount</p>
              {cartLoading ? (
                <Skeleton className="w-[48px] h-[20px]" />
              ) : (
                <p>{discount_price?.toFixed(2)}</p>
              )}
            </div>
            <div className="flex justify-between items-center text-[#B8B8B8] text-[17px] leading-7 font-inter font-semibold">
              <p>Subtotal</p>
              {cartLoading ? (
                <Skeleton className="w-[48px] h-[20px]" />
              ) : (
                <p>{total_price?.toFixed(2)}</p>
              )}
            </div>
          </div>
          <SummaryBtn
            onClick={handlePayment}
            disabled={cartLoading || !games?.length}
            className="mt-6"
            title="Go to payment"
          />
        </div>
      </Summary>
    </div>
  );
};

export default Checkout;
