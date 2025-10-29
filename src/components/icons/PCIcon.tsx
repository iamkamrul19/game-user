import React, { ComponentProps } from "react";

const PCIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 13.75V12.25L3.75 11.5H1.5C1.0875 11.5 0.7345 11.3532 0.441 11.0597C0.1475 10.7662 0.0005 10.413 0 10V1.75C0 1.3375 0.147 0.9845 0.441 0.691C0.735 0.3975 1.088 0.2505 1.5 0.25H13.5C13.9125 0.25 14.2657 0.397 14.5597 0.691C14.8537 0.985 15.0005 1.338 15 1.75V10C15 10.4125 14.8532 10.7657 14.5597 11.0597C14.2662 11.3537 13.913 11.5005 13.5 11.5H11.25L12 12.25V13.75H3ZM1.5 10H13.5V1.75H1.5V10Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
    </svg>
  );
};

export default PCIcon;
