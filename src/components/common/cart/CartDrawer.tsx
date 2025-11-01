/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useAddToCartMutation } from "@/redux/api/checkoutApi";
import { useAppSelector } from "@/redux/hooks";
import { setCheckoutGames } from "@/redux/slice/checkoutSlice";
import { setIsCartOpen } from "@/redux/slice/globalSlice";
import { ICheckoutGame } from "@/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import SingleCart from "./SingleCart";
const CartDrawer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isCartOpen } = useAppSelector((state) => state.global);
  const { games, total_price } = useAppSelector((state) => state.checkout);
  const [addToCart] = useAddToCartMutation();

  const handleCheckout = () => {
    dispatch(setIsCartOpen(false));
    router.push("/checkout");
  };

  const handlePaynow = () => {
    dispatch(setIsCartOpen(false));
    router.push("/checkout/payment");
  };

  useEffect(() => {
    const cartData = Cookies.get("checkout");
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove("checkout");
      Cookies.remove("token");
      dispatch(setCheckoutGames([]));
    }
    if (cartData && token) {
      try {
        const parsedCartData: ICheckoutGame[] = JSON.parse(cartData);
        if (
          parsedCartData &&
          Array.isArray(parsedCartData) &&
          parsedCartData?.length
        ) {
          dispatch(setCheckoutGames(parsedCartData || []));
        }
      } catch (error) {
        dispatch(setCheckoutGames([]));
        console.error("Error parsing cart data from cookie:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    async function getPrice() {
      if (!isCartOpen) return;
      const res = await addToCart({
        data: {
          coupon_code: "",
          payment_method_id: "",
          ip: "",
          games: games,
        },
      }).unwrap();
      console.log("res", res);
    }
    getPrice();
  }, [games, isCartOpen]);
  return (
    <Drawer
      direction="right"
      open={isCartOpen}
      onOpenChange={(value) => dispatch(setIsCartOpen(value))}
    >
      <DrawerTitle></DrawerTitle>
      <DrawerContent
        // onInteractOutside={(e) => {
        //   e.preventDefault();
        // }}
        className="my-3 bg-transparent border border-[#4C4C4C] rounded-[20px] max-w-[380px] ml-auto mr-3 overflow-hidden"
      >
        <div className="bg-[#252525] h-full relative">
          <div className="flex justify-between items-center px-4 pt-5 pb-7 border-b-[1px] border-b-white/10">
            <h3 className="text-white-gradient text-[20px] leading-[28px] font-inter font-semibold">
              Cart
            </h3>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => dispatch(setIsCartOpen(false))}
            >
              <IoClose className="size-[20px] text-white" />
            </button>
          </div>
          <div className="h-[435px] overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
            {games?.map((item) => (
              <SingleCart key={item.id} game={item} />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-[#2D2D2D] px-4 pt-4 pb-6">
            <div className="flex justify-between items-center">
              <p className="text-[14px] font-poppins leading-[14px] font-semibold text-white">
                Total cart
              </p>
              <p className="text-[16px] font-poppins leading-[14px] font-semibold text-white">
                {total_price || 0}
              </p>
            </div>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                onClick={handleCheckout}
                className="w-full text-[14px] font-semibold font-inter leading-[21px] text-white border-[1px] border-white/50 rounded-[10px] py-3 cursor-pointer shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                type="button"
              >
                Go to cart
              </button>
              <Button onClick={handlePaynow} variant="blue" className="w-full">
                Pay now
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
