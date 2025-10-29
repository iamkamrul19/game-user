import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { ISection } from ".";
import { useDispatch } from "react-redux";
import { setTransactionId } from "@/redux/slice/checkoutSlice";

interface Props {
  setSection: Dispatch<SetStateAction<ISection>>;
}

const PaymentLoading = ({ setSection }: Props) => {
  const dispaatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const coupon = params.get("coupon") || undefined;
  const transaction_id = params.get("transaction_id") || undefined;

  useEffect(() => {
    if (!transaction_id) {
      toast.error("Transaction id is missing");
      router.replace(`/checkout/payment${coupon ? `?coupon=${coupon}` : ""}`);
    } else {
      dispaatch(setTransactionId(transaction_id || null));
      setSection("process");
    }
  }, [transaction_id]);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="size-[32px] rounded-full" />
        <Skeleton className="w-[220px] h-[14px]" />
      </div>
      <div className="main-container mt-9 flex flex-col lg:flex-row gap-6 overflow-x-auto custom-scrollbar">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="min-h-[231px] w-[241px] flex-shrink-0 pb-3">
            {/* Image skeleton */}
            <Skeleton className="h-[151px] w-full rounded-[5px]" />

            {/* Text skeleton */}
            <div className="mt-8 space-y-2">
              <Skeleton className="h-[10px] w-[80px] rounded" />{" "}
              {/* platform */}
              <Skeleton className="h-[14px] w-[160px] rounded" /> {/* title */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentLoading;
