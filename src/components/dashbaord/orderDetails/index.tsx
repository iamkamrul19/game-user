/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useLazyGetSingleOrderQuery } from "@/redux/api/orderApi";
import {
  useViewRequestMutation,
  useViewRequestVerifyMutation,
} from "@/redux/api/tempAccessApi";
import { IOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import copy from "copy-text-to-clipboard";
import { ArrowLeft, CircleCheckIcon, CopyIcon, Edit2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import OrderCard from "../myOders/OrderCard";
import OrderCardSkeleton from "../myOders/OrderCardSkeleton";
import { otpSchema } from "./orderDetails.schema";
const OrderDetails = () => {
  const [open, setOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [order, setOrder] = useState<IOrder | undefined>(undefined);
  const { orderId } = useParams();
  const [singleOrder] = useLazyGetSingleOrderQuery();
  const [viewMutation, { isLoading: vLoading }] = useViewRequestMutation();
  const [verifyMutation, { isLoading: oLoading }] =
    useViewRequestVerifyMutation();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      module: "order_details",
      view_id: undefined,
      otp: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    try {
      const res = await verifyMutation({
        module: values.module,
        view_id: values.view_id,
        otp: values.otp,
      }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message);
        setOrder(res?.data || order);
        setIsBlur(false);
        setOpen(false);
        form.reset({
          module: "order_details",
          view_id: order?.id,
          otp: undefined,
        });
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }

  const handleCopy = (value: string) => {
    copy(value);
  };

  const handleView = async (orderId: string) => {
    try {
      const res = await viewMutation({
        module: "order_details",
        view_id: orderId,
      }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message);
        setOpen(true);
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "");
    }
  };

  useEffect(() => {
    async function getOrder() {
      try {
        if (!orderId) return;
        setLoading(true);
        const res = await singleOrder({ id: orderId as string }).unwrap();
        if (res?.data?.id) {
          setOrder(res?.data);
        } else {
          router.replace("/not-found");
          toast.error(res?.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        router.replace("/not-found");
        toast.error(error?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    getOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      form.setValue("view_id", order?.id);
    }
  }, [order]);

  return (
    <>
      <div className="mt-10">
        <div className="flex items-center gap-2">
          <Link
            href={"/dashboard/my-orders"}
            className="bg-[#404040] border-[1px] border-[#D6D6D6] size-[36px] rounded-full flex justify-center items-center text-white"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-white-gradient text-[26px] leading-7 font-inter font-bold">
            Order Details
          </h1>
        </div>
        <div className="mt-8">
          {loading || !order ? (
            <OrderCardSkeleton />
          ) : (
            <OrderCard order={order} isLink={false} />
          )}
        </div>
        <div className="mt-16 flex flex-col items-center gap-6">
          {order?.games?.length
            ? order?.games?.map((game) => (
                <div
                  key={game.id}
                  className="bg-[#232323] rounded-[10px] min-w-[660px] py-8 px-10 flex flex-col items-center gap-9"
                >
                  <p className="text-white-gradient text-[16px] leading-7 font-bold font-inter flex items-center gap-2">
                    <CircleCheckIcon className="fill-[#7C7C7C] stroke-[#232323]" />{" "}
                    is now ready for activation
                  </p>
                  <div className="flex flex-col gap-5">
                    {game?.keys?.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        <div className="relative h-[58px] bg-gradient-to-r from-[#F8C431] to-[#FF6400] rounded-[50px] flex items-center justify-center p-[1px] overflow-hidden w-[320px]">
                          <div className="bg-[#161616] h-full w-full rounded-[50px] flex items-center">
                            <span
                              className={`text-[15px] leading-7 font-bold font-inter text-white py-3 px-5 truncate ${
                                isBlur && "blur-sm"
                              }`}
                            >
                              {item.key}
                            </span>
                          </div>
                          {isBlur && (
                            <button
                              disabled={vLoading}
                              onClick={() => handleView(order?.id)}
                              type="button"
                              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-white cursor-pointer"
                            >
                              View
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleCopy(item.key)}
                          disabled={isBlur}
                          type="button"
                          className="size-[58px] border-[1px] border-white bg-white/15 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-default"
                        >
                          <CopyIcon className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-8 max-w-[366px] text-center">
                    <p className="text-[13px] leading-[20px] font-medium font-inter text-white/60">
                      Struggling with how to{" "}
                      <Link className="text-[#ADEE68] underline" href={"/"}>
                        activate the code?
                      </Link>{" "}
                      View the activation tutorial or contact us
                    </p>
                    <p className="text-[13px] leading-[20px] font-medium font-inter text-white/60">
                      issue with the product?{" "}
                      <Link className="text-[#FAB127] underline" href={"/"}>
                        Report a problem
                      </Link>
                    </p>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-white-gradient text-[13px] leading-5 font-medium font-inter text-white/60 justify-center cursor-pointer py-2 px-7 bg-[#353535] border-[1px] border-[#717171] rounded-[50px]"
                    >
                      <Edit2Icon className="text-white/60 size-[14px]" />
                      Write a review about this product
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle className="text-white">Otp Form</DialogTitle> */}
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} method="post">
            <div className="flex flex-col gap-3 flex-1">
              <label htmlFor="otp" className="text-white text-[14px] leading-5">
                Enter your OTP
              </label>
              <Controller
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <input
                    {...field}
                    value={field.value} // react-hook-form value
                    onChange={(e) => {
                      field.onChange(e); // ✅ update react-hook-form
                    }}
                    type="text"
                    placeholder="Enter otp"
                    className="bg-[#161616] border border-white/20 rounded-[50px] px-6 py-4 text-[14px] leading-[21px] font-inter text-[#929292]"
                  />
                )}
              />
              <ErrorMessage msg={form?.formState?.errors?.otp?.message} />
            </div>
            <button
              disabled={oLoading}
              type="submit"
              className="mt-3 flex items-center gap-2 text-white-gradient text-[13px] leading-5 font-medium font-inter text-white/60 justify-center cursor-pointer py-2 px-7 bg-[#353535] border-[1px] border-[#717171] rounded-[50px]"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetails;
