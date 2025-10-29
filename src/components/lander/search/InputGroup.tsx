import React, { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

const InputGroup = ({ children, label }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] leading-[12px] text-white uppercase font-semibold font-poppins">
        {label}
      </p>
      {children}
    </div>
  );
};

export default InputGroup;
