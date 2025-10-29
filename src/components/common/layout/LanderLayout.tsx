/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode } from "react";
import Offer from "../offer";
import LanderNavbar1 from "./navbar/LanderNavbar1";
import { useAppSelector } from "@/redux/hooks";
// import { LANDING_PAGE } from "@/enum";
// import LanderNavbar2 from "./navbar/LanderNavbar2";

interface Props {
  children: ReactNode;
}

const LanderLayout = ({ children }: Props) => {
  const { offer } = useAppSelector((state) => state.settings);
  return (
    <>
      {offer?.show_offer && <Offer offer={offer as any} />}
      {/* {id === LANDING_PAGE.PAGE_2 ? (
        <LanderNavbar2 />
      ) : (
        <LanderNavbar1 showOffer={offer?.show_offer} />
      )} */}
      <LanderNavbar1 showOffer={offer?.show_offer} />
      {children}
    </>
  );
};

export default LanderLayout;
