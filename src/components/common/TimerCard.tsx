interface Props {
  title: string;
  value: string;
  className?: string;
}

const TimerCard = ({ value, title, className }: Props) => {
  return (
    <div
      className={`size-[50px] border-[1px] border-[#FFFFFF38] rounded-[7px] backdrop-blur-[30px] bg-[#232323] flex flex-col items-center justify-center text-white ${className}`}
    >
      <p className="text-[18px] leading-[18px] font-bold font-poppins">
        {value}
      </p>
      <p className="text-[10px] leading-[8px] font-semibold font-inter uppercase mt-1">
        {title}
      </p>
    </div>
  );
};

export default TimerCard;
