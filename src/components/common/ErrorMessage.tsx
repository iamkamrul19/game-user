import React from "react";

interface Props {
  msg: string | undefined;
  className?: string;
}
const ErrorMessage = ({ msg, className }: Props) => {
  return msg ? (
    <span className={`text-red-600 text-[13px] font-inter ${className}`}>
      {msg}
    </span>
  ) : null;
};

export default ErrorMessage;
