import React, { ComponentProps } from "react";

const SparkIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.5261 10.6668H21.0874L23.9234 3.13616C24.2514 2.26416 23.6074 1.3335 22.6754 1.3335H14.7447C13.5967 1.3335 12.5781 2.06816 12.2154 3.1575L8.07539 15.5788C7.78739 16.4415 8.43006 17.3335 9.33939 17.3335H12.4901L9.36606 29.4935C9.12606 30.4562 10.3407 31.0908 10.9941 30.3455L26.3754 12.5388C27.0141 11.8095 26.4954 10.6668 25.5261 10.6668Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SparkIcon;
