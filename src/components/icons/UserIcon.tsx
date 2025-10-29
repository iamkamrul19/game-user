import React, { ComponentProps } from "react";

const UserIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="15"
      height="21"
      viewBox="0 0 15 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 19.5V17.5C1.5 16.4391 1.92143 15.4217 2.67157 14.6716C3.42172 13.9214 4.43913 13.5 5.5 13.5H9.5C10.5609 13.5 11.5783 13.9214 12.3284 14.6716C13.0786 15.4217 13.5 16.4391 13.5 17.5V19.5M3.5 5.5C3.5 6.56087 3.92143 7.57828 4.67157 8.32843C5.42172 9.07857 6.43913 9.5 7.5 9.5C8.56087 9.5 9.57828 9.07857 10.3284 8.32843C11.0786 7.57828 11.5 6.56087 11.5 5.5C11.5 4.43913 11.0786 3.42172 10.3284 2.67157C9.57828 1.92143 8.56087 1.5 7.5 1.5C6.43913 1.5 5.42172 1.92143 4.67157 2.67157C3.92143 3.42172 3.5 4.43913 3.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
