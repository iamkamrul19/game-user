import React, { ComponentProps } from "react";

const PlayIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 4.28669C0 1.13033 3.4846 -0.782527 6.1475 0.912046L16.697 7.62535C19.167 9.19717 19.167 12.8028 16.697 14.3746L6.14751 21.0879C3.48461 22.7825 0 20.8697 0 17.7133V4.28669Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PlayIcon;
