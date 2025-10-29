import React, { ComponentProps } from "react";

const FacebookIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        width="44.3118"
        height="44.3118"
        rx="22.1559"
        fill="#3175EF"
      />
      <path
        d="M25.5938 16.2363H27.2599V13.418C26.4532 13.3342 25.6427 13.2927 24.8317 13.294C22.4211 13.294 20.7727 14.7651 20.7727 17.4593V19.7812H18.0519V22.9362H20.7727V31.0187H24.034V22.9362H26.7459L27.1536 19.7812H24.034V17.7695C24.034 16.8389 24.2822 16.2363 25.5938 16.2363Z"
        fill="white"
      />
    </svg>
  );
};

export default FacebookIcon;
