import { LockIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const data = [
  {
    name: "Shopping cart",
    link: "/checkout",
  },
  {
    name: "Payment",
    link: "/checkout/payment",
  },
  {
    name: "Game activation",
    link: "/checkout/make-payment",
  },
];

const CheckoutHeader = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-10">
      <div className="flex items-center flex-wrap gap-4">
        {data?.map((item, idx) => (
          <Step
            key={item.link}
            name={item.name}
            step={idx + 1}
            active={pathName === item.link}
            hideLine={idx + 1 === data?.length}
          />
        ))}
      </div>
      <div className="hidden lg:flex items-center gap-2">
        <div className="text-end">
          <p className="font-inter font-medium text-[13px] leading-[12px] text-white">
            Secure payment
          </p>
          <p className="text-[11px] text-[#B8B8B8] font-inter font-normal leading-[11px] mt-1.5">
            256-bit SSL Secured
          </p>
        </div>
        <div className="bg-[#002E1C] size-[38px] flex justify-center items-center rounded-[10px] p-1">
          <LockIcon className="stroke-[#00FF9A]" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;

const Step = ({
  name,
  step,
  active,
  hideLine,
}: {
  name: string;
  step: number;
  active: boolean;
  hideLine: boolean;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-[30px] h-[30px] size-[30px] rounded-full flex justify-center items-center text-[14px] leading-5 font-semibold font-inter text-white ${
            active ? "bg-[#8552FE]" : "bg-[#434343]"
          }`}
        >
          {step}
        </div>
        <p className="text-[14px] leading-[18px] text-[#D9D9D9] font-inter font-medium">
          {name}
        </p>
      </div>
      {!hideLine && <hr className="w-[30px]" />}
    </div>
  );
};
