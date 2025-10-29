import React from "react";
interface Props {
  title: string;
  className?: string;
}
const SettingTitle = ({ title, className }: Props) => {
  return (
    <h4
      className={`text-[18px] leading-7 font-inter font-bold text-white-gradient ${className}`}
    >
      {title}
    </h4>
  );
};

export default SettingTitle;
