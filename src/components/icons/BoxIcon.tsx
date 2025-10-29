import React, { ComponentProps } from "react";

const BoxIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.8127 20.011V35.5757L27.9999 43.8406M13.8127 20.011L27.9999 12.1602L42.1871 20.011M13.8127 20.011L27.9999 28.0022M27.9999 43.8406L42.1871 35.5757V20.011M27.9999 43.8406V28.0022M42.1871 20.011L27.9999 28.0022M20.9052 16.0859L35.1553 23.9714"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default BoxIcon;
