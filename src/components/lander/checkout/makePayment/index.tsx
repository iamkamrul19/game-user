"use clinet";

import { useState } from "react";
import PaymentProcess from "./PaymentProcess";
import ThankYou from "./ThankYou";
import PaymentFailed from "./PaymentFailed";
import PaymentLoading from "./PaymentLoading";

export type ISection = "process" | "thankyou" | "failed" | "loading";

const MakePayment = () => {
  const [section, setSection] = useState<ISection>("loading");

  const renderSection = (section: ISection) => {
    switch (section) {
      case "process":
        return <PaymentProcess setSection={setSection} />;
      case "thankyou":
        return <ThankYou />;
      case "failed":
        return <PaymentFailed />;
      case "loading":
        return <PaymentLoading setSection={setSection} />;
      default:
        return null;
    }
  };
  return <div>{renderSection(section)}</div>;
};

export default MakePayment;
