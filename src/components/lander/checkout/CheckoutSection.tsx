"use client";

import { useParams } from "next/navigation";
import Payment from "./payment";
import MakePayment from "./makePayment";

const CheckoutSection = () => {
  const { section } = useParams();
  const getScreen = (section: string) => {
    switch (section) {
      case "payment":
        return <Payment />;
      case "make-payment":
        return <MakePayment />;
      default:
        return null;
    }
  };
  return <div>{getScreen(section as string)}</div>;
};

export default CheckoutSection;
