import React, { ComponentProps } from "react";
import ButtonLoader from "../common/loader/ButtonLoader";

interface Props extends ComponentProps<"button"> {
  className?: string;
  parentClassName?: string;
  isLoading?: boolean;
  variant: "outline" | "blue" | "auth" | "yellow";
}

const Button = ({
  className,
  parentClassName,
  variant,
  isLoading = false,
  ...rest
}: Props) => {
  if (variant === "outline") {
    return (
      <button
        className={`bg-gradient-to-r from-[#F8C431] to-[#FF6400] p-[2px] rounded-[12px] cursor-pointer flex justify-center items-center w-full ${parentClassName}`}
        {...rest}
      >
        <span
          className={`py-[6px] px-[16px] lg:py-[10px] lg:px-6 rounded-[10px] h-full w-full text-white text-[14px] lg:text-[15px] leading-[18px] lg:leading-[21px] font-inter font-semibold flex items-center justify-center gap-2.5  ${className}`}
        >
          {rest.children}
        </span>
      </button>
    );
  }
  if (variant === "auth") {
    return (
      <button
        className={`px-[24px] py-[14px] rounded-[50px] bg-[#8552FE] cursor-pointer flex justify-center items-center text-white gap-2 disabled:bg-[#8552FE]/70 disabled:cursor-auto ${parentClassName}`}
        {...rest}
      >
        {isLoading && <ButtonLoader className="size-[28px]" />}
        {!isLoading && rest.children}
      </button>
    );
  }
  if (variant === "yellow") {
    return (
      <button
        className={`bg-gradient-to-r from-[#F8C431] to-[#FF6400] p-[2px] rounded-[12px] cursor-pointer flex justify-center items-center w-full ${parentClassName}`}
        {...rest}
      >
        <span
          className={`py-[6px] px-[16px] lg:py-[10px] lg:px-6 rounded-[10px] h-full w-full text-white text-[14px] lg:text-[15px] leading-[18px] lg:leading-[21px] font-inter font-semibold flex items-center justify-center gap-2.5  ${className}`}
        >
          {rest.children}
        </span>
      </button>
    );
  }
  if (variant === "blue") {
    return (
      <button
        className={`cursor-pointer bg-[#5D52FE] py-[14px] px-[11px] rounded-[8px] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] text-[14px] font-semibold leading-[21px] font-inter !text-white ${className}`}
        {...rest}
      >
        {rest.children}
      </button>
    );
  }
  return (
    <button className={` ${className}`} {...rest}>
      {rest.children}
    </button>
  );
};

export default Button;
