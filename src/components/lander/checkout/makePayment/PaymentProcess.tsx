"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ISection } from ".";
import GlobalLoader from "@/components/common/loader/GlobalLoader";
import PaymentTitle from "./PaymentTitle";
import PaymentItems from "./PaymentItems";
import { useAppSelector } from "@/redux/hooks";
import { useConfirmOrderMutation } from "@/redux/api/checkoutApi";
import toast from "react-hot-toast";

interface Props {
  setSection: Dispatch<SetStateAction<ISection>>;
}

const PaymentProcess = ({ setSection }: Props) => {
  const { transaction_id } = useAppSelector((state) => state.checkout);
  const [confirmMutation] = useConfirmOrderMutation();

  useEffect(() => {
    async function confirmOrder() {
      if (!transaction_id) return;
      const res = await confirmMutation({ transaction_id }).unwrap();
      if (res.statusCode === 200) {
        toast.success(res.message);
        setSection("thankyou");
      } else {
        setSection("failed");
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.data?.message || "");
        setSection("failed");
      }
    }
    confirmOrder();
  }, [transaction_id]);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <GlobalLoader className="text-white size-[30px]" />
        <PaymentTitle title="Your payment is in progress" />
        <p className="text-[#EAEAEA] text-[13px] leading-[16px] font-inter max-w-[250px] text-center">{`We're waiting for your payment to validate your order`}</p>
      </div>
      <PaymentItems />
    </div>
  );
};

export default PaymentProcess;
