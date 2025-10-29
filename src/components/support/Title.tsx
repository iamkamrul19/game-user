import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h1"> {
  className?: string;
}

const Title = ({ className, ...rest }: Props) => {
  return (
    <h1
      className={twMerge(
        "text-white text-[23px] leading-[23px] font-semibold font-poppins",
        className
      )}
      {...rest}
    >
      {rest.children}
    </h1>
  );
};

export default Title;
