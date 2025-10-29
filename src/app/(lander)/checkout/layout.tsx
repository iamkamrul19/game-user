import CheckoutLayout from "@/components/common/layout/CheckoutLayout";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Checkout = ({ children }: Props) => {
  return <CheckoutLayout>{children}</CheckoutLayout>;
};

export default Checkout;
