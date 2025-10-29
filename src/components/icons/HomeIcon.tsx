import React, { ComponentProps } from "react";

const HomeIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.5 16.5V9H10V16.5M1 6.75L7.75 1.5L14.5 6.75V15C14.5 15.3978 14.342 15.7794 14.0607 16.0607C13.7794 16.342 13.3978 16.5 13 16.5H2.5C2.10218 16.5 1.72064 16.342 1.43934 16.0607C1.15804 15.7794 1 15.3978 1 15V6.75Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
