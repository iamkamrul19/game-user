import React, { ComponentProps } from "react";
import BookmarkIcon from "../icons/BookmarkIcon";

interface Props extends ComponentProps<"button"> {
  className?: string;
}

const Bookmark = ({ className, ...props }: Props) => {
  return (
    <button
      className={`size-[37px] border-[1px] border-white/20 backdrop-blur-[10px] rounded-[7px] flex justify-center items-center text-white cursor-pointer ${className}`}
      {...props}
    >
      <BookmarkIcon />
    </button>
  );
};

export default Bookmark;
