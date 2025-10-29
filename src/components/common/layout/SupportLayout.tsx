"use client";

interface Props {
  children: React.ReactNode;
}
const SupportLayout = ({ children }: Props) => {
  return (
    <div className="relative">
      <div className="absolute top-[130px] left-[50%] -translate-x-1/2 size-[280px] rounded-full bg-[#006BAA] blur-[200px] opacity-50 pointer-events-none"></div>
      <div className="absolute top-[150px] left-[50%] -translate-x-1/2 size-[280px] rounded-full bg-[#71009E] blur-[200px] opacity-50 pointer-events-none"></div>
      {children}
    </div>
  );
};

export default SupportLayout;
