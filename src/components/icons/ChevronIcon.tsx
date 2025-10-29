import React, { ComponentProps } from "react";

const ChevronIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="13"
      height="21"
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 19.5L11 10.5L2 1.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
