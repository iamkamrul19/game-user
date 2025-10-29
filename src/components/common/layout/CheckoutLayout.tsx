"use client";

import { CHECKOUT_PATHS } from "@/components/lander/checkout/checkout.data";
import CheckoutHeader from "@/components/lander/checkout/CheckoutHeader";
import { useAddToCartMutation } from "@/redux/api/checkoutApi";
import { useAppSelector } from "@/redux/hooks";
import { setCartLoading, setCoupon } from "@/redux/slice/checkoutSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  children: ReactNode;
}

const CheckoutLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const params = useSearchParams();
  const coupon = params.get("coupon") || "";
  const router = useRouter();
  const dispatch = useDispatch();
  const [addToCart] = useAddToCartMutation();
  const { checkout, global } = useAppSelector((state) => state);
  const { games, coupon_code, payment_method_id } = checkout;
  const { ip } = global;
  useEffect(() => {
    async function getPrice() {
      if (!games?.length) return;
      try {
        dispatch(setCartLoading(true));
        await addToCart({
          data: {
            coupon_code: coupon_code || "",
            payment_method_id: payment_method_id || "",
            ip: ip || "",
            games: games,
          },
        }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.data?.message || "");
      } finally {
        dispatch(setCartLoading(false));
      }
    }
    getPrice();
  }, [games, coupon_code, payment_method_id]);

  useEffect(() => {
    if (!CHECKOUT_PATHS.includes(pathName)) {
      router.replace("/checkout");
    }
  }, [pathName]);

  useEffect(() => {
    if (coupon) {
      dispatch(setCoupon(coupon));
    }
  }, [coupon]);

  return (
    <div className="main-container py-[100px] lg:py-[150px]">
      <CheckoutHeader />
      {children}
    </div>
  );
};

export default CheckoutLayout;
