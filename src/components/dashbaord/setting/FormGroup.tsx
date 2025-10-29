import ErrorMessage from "@/components/common/ErrorMessage";
import React from "react";

interface Props {
  label: string;
  children: React.ReactNode;
  error: string | undefined;
}

const FormGroup = ({ children, error, label }: Props) => {
  return (
    <div className="flex flex-col flex-1">
      <label className="text-[12px] leading-[18px] font-inter font-medium text-white mb-2">
        {label}
      </label>
      {children}
      {error && <ErrorMessage msg={error} />}
    </div>
  );
};

export default FormGroup;
