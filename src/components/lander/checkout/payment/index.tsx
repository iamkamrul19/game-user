"use client";

import { Controller, useForm } from "react-hook-form";
import Summary from "../Summary";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { paymentSchema } from "./payment.schema";
import { useAppSelector } from "@/redux/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SummaryField from "../SummaryField";
import SummaryBtn from "../SummaryBtn";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useGetCountryListListQuery } from "@/redux/api/countryApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useGetPaymentMethodQuery } from "@/redux/api/paymentApi";
import Image from "next/image";
import PaymentCardSkeleton from "./PaymentCardSkeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMakePaymentMutation } from "@/redux/api/checkoutApi";
import { useDispatch } from "react-redux";
import {
  setBilingAddress,
  setPaymentMethod,
} from "@/redux/slice/checkoutSlice";
const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    coupon_code,
    games,
    vat_percentage,
    cartLoading,
    total_price,
    billing_address,
  } = useAppSelector((state) => state.checkout);
  const { ip } = useAppSelector((state) => state.global);
  const { countryList } = useAppSelector((state) => state.settings);
  const {} = useGetCountryListListQuery(undefined, {
    skip: games?.length === 0,
  });
  const [makePayment, { isLoading }] = useMakePaymentMutation();
  const { data: paymentMethod, isLoading: pLoading } = useGetPaymentMethodQuery(
    undefined,
    { skip: games?.length === 0 }
  );
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      full_name: "",
      address: "",
      country: "",
      phone_number: "",
      payment_method_id: undefined,
    },
  });

  const getMethodLogo = (method: string) => {
    const data = method?.toLowerCase();
    if (data === "sslcommerz") {
      return "/payment/ssl-commerce.png";
    } else if (data === "nagad") {
      return "/payment/nagad.svg";
    } else if (data === "bkash") {
      return "/payment/bkash.svg";
    }
    return "";
  };

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    // console.log(values);
    try {
      const payload = {
        payment_method_id: values.payment_method_id,
        ip,
        games,
        billing_address,
        coupon_code,
        country: values.country,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      const res = await makePayment({ data: payload }).unwrap();
      // console.log("res", res);
      if (res?.statusCode === 200) {
        const { transaction_id } = res.data;
        if (transaction_id) {
          router.push(
            `/checkout/make-payment?transaction_id=${transaction_id}`
          );
        } else {
          toast.error(res?.message || "");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "");
    }
    // router.push("/checkout/make-payment");
  }

  useEffect(() => {
    if (billing_address) {
      form.setValue("full_name", billing_address?.full_name);
      form.setValue("address", billing_address?.address);
      form.setValue("country", billing_address?.country);
      form.setValue("phone_number", billing_address?.phone_number);
    }
  }, [billing_address, form]);

  const loading = pLoading || isLoading;
  return (
    <div className="">
      <form onSubmit={form.handleSubmit(onSubmit)} method="post">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 flex flex-col gap-5">
            <Summary
              title="Billing address"
              className="!bg-[#232323] lg:!max-w-[100%]"
            >
              <div className="mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <Controller
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <input
                        {...field}
                        value={field.value} // react-hook-form value
                        onChange={(e) => {
                          field.onChange(e); // ✅ update react-hook-form
                          dispatch(
                            setBilingAddress({
                              ...billing_address,
                              full_name: e.target.value, // ✅ update redux
                            })
                          );
                        }}
                        type="text"
                        placeholder="Full Name"
                        className="bg-[#161616] border border-white/20 rounded-[50px] px-6 py-4 text-[14px] leading-[21px] font-inter text-[#929292]"
                      />
                    )}
                  />
                  <ErrorMessage
                    msg={form?.formState?.errors?.full_name?.message}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Controller
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <input
                        {...field}
                        value={field.value} // react-hook-form value
                        onChange={(e) => {
                          field.onChange(e); // ✅ update react-hook-form
                          dispatch(
                            setBilingAddress({
                              ...billing_address,
                              phone_number: e.target.value, // ✅ update redux
                            })
                          );
                        }}
                        type="text"
                        placeholder="Phone Number"
                        className="bg-[#161616] border border-white/20 rounded-[50px] px-6 py-4 text-[14px] leading-[21px] font-inter text-[#929292]"
                      />
                    )}
                  />
                  <ErrorMessage
                    msg={form?.formState?.errors?.phone_number?.message}
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <Controller
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <input
                        {...field}
                        value={field.value} // react-hook-form value
                        onChange={(e) => {
                          field.onChange(e); // ✅ update react-hook-form
                          dispatch(
                            setBilingAddress({
                              ...billing_address,
                              address: e.target.value, // ✅ update redux
                            })
                          );
                        }}
                        type="text"
                        placeholder="Address"
                        className="bg-[#161616] border border-white/20 rounded-[50px] px-6 py-4 text-[14px] leading-[21px] font-inter text-[#929292]"
                      />
                    )}
                  />

                  <ErrorMessage
                    msg={form?.formState?.errors?.address?.message}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Controller
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <Select
                        value={field.value || billing_address?.country || ""}
                        onValueChange={(value) => {
                          field.onChange(value);
                          dispatch(
                            setBilingAddress({
                              ...billing_address,
                              country: value,
                            })
                          );
                        }}
                      >
                        <SelectTrigger className="flex-1 w-full rounded-[50px] px-6 py-4 bg-[#161616] border-[1px] border-white/20 text-[#929292] cursor-pointer">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryList?.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <ErrorMessage
                    msg={form?.formState?.errors?.country?.message}
                  />
                </div>
              </div>
            </Summary>
            <div className="p-5">
              <h4 className="text-[21px] leading-7 text-white-gradient font-inter font-bold">
                Payment Method
              </h4>
              <div className="mt-5">
                <div className="flex flex-col gap-4">
                  {pLoading ? (
                    <PaymentCardSkeleton />
                  ) : (
                    paymentMethod?.data?.map((item) => (
                      <Controller
                        key={item.id}
                        control={form.control}
                        name={"payment_method_id"}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <label
                            className="bg-[#232323] px-5 p-5 rounded-[20px] cursor-pointer flex items-center gap-3"
                            htmlFor={item.id}
                          >
                            <input
                              type="radio"
                              id={item.id}
                              value={item.id}
                              checked={field.value === item.id} // ✅ controlled properly
                              onChange={() => {
                                field.onChange(item.id);
                                dispatch(setPaymentMethod(item.id));
                              }}
                            />
                            <div className="flex items-center gap-4">
                              <div className="w-[57px] h-[37px] rounded-[5px] overflow-hidden">
                                <Image
                                  className="w-full h-full object-center object-cover"
                                  src={getMethodLogo(item.name)}
                                  height={37}
                                  alt=""
                                  width={57}
                                />
                              </div>
                              <p className="text-[15px] leading-7 text-white font-inter font-bold">
                                {item.name}
                              </p>
                            </div>
                          </label>
                        )}
                      />
                    ))
                  )}
                </div>
                <ErrorMessage
                  className="mt-1.5"
                  msg={form.formState.errors?.payment_method_id?.message}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Summary
              title="Summary"
              className="lg:!min-w-[350px] !bg-[#232323]"
            >
              <div className="flex-1 pt-4">
                {games?.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center ${
                      games?.length === index + 1
                        ? ""
                        : "border-b border-b-white/20 mb-2 pb-2"
                    }`}
                  >
                    <div className="">
                      <Tooltip>
                        <TooltipTrigger>
                          <h4 className="text-[13px] leading-[28px] font-semibold font-inter text-white max-w-[180px] truncate">
                            {item?.title}
                          </h4>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item?.title}</p>
                        </TooltipContent>
                      </Tooltip>

                      <p className="text-[11px] leading-7 font-inter font-medium text-[#B8B8B8]">
                        {item?.platform}
                      </p>
                    </div>
                    <p className="text-[17px] leading-7 font-inter font-bold text-white">
                      {item?.offer_price}TK
                    </p>
                  </div>
                ))}
              </div>
            </Summary>
            <Summary>
              <div className="flex flex-col gap-5 mt-5">
                <SummaryField
                  title="VAT (0%) :"
                  value={vat_percentage?.toFixed(2)}
                  isLoading={cartLoading}
                />
                <SummaryField
                  className="!text-[17px] !font-semibold"
                  title="Total"
                  value={total_price?.toFixed(2)}
                  isLoading={cartLoading}
                />
                <SummaryBtn
                  type="submit"
                  title="Pay now"
                  disabled={loading}
                  className="py-4"
                />
              </div>
              <p className="mx-auto text-center text-white text-[11px] leading-[19px] mt-4 max-w-[310px] font-inter">
                {`By clicking "Pay" I acknowledge having read and accepted the `}
                <Link className="underline" href={"/terms-and-condition"}>
                  terms and conditions
                </Link>
                , and the 
                <Link className="underline" href={"/privacy-policy"}>
                  privacy policy
                </Link>
                .
              </p>
            </Summary>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
