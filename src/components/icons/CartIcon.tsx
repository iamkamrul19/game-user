import React, { ComponentProps } from "react";

const CartIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.6405 20C8.46893 20 9.1405 19.3284 9.1405 18.5C9.1405 17.6716 8.46893 17 7.6405 17C6.81208 17 6.1405 17.6716 6.1405 18.5C6.1405 19.3284 6.81208 20 7.6405 20Z"
        fill="currentColor"
      />
      <path
        d="M16.6405 20C17.4689 20 18.1405 19.3284 18.1405 18.5C18.1405 17.6716 17.4689 17 16.6405 17C15.8121 17 15.1405 17.6716 15.1405 18.5C15.1405 19.3284 15.8121 20 16.6405 20Z"
        fill="currentColor"
      />
      <path
        d="M3.1405 5H5.1405L5.7405 8M5.7405 8L7.1405 15H17.1405L19.1405 8H5.7405Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
