"use client";

import BreadCrumbs from "@/components/common/breadcrumbs";
import React from "react";
import Title from "../Title";
import { COMMON_SERVICES, SUPPORT_DATA } from "../support.data";
import SupportCard from "./SupportCard";
import CommonService from "./CommonService";

const Support = () => {
  return (
    <div className="main-container py-[130px]">
      <BreadCrumbs links={["support"]} />

      <div className="text-center mt-12">
        <Title>GG Subscriptions Support</Title>
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 mt-10">
          {SUPPORT_DATA.map((item, index) => (
            <SupportCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <Title>Common Services link</Title>
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 mt-10">
          {COMMON_SERVICES.map((item, index) => (
            <CommonService key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
