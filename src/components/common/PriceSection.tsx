import React from "react";

interface Props {
  price: number;
  offerPrice: number;
  className?: string;
  discountColor?: string;
}

const PriceSection = ({
  price,
  offerPrice,
  className,
  discountColor = "#A5FF46",
}: Props) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <p className="text-[20px] leading-5 text-white/60 font-poppins line-through">
        Tk {price}
      </p>
      <p
        style={{ color: discountColor }}
        className={`text-[20px] leading-5 font-poppins font-semibold`}
      >
        Tk {offerPrice}
      </p>
    </div>
  );
};

export default PriceSection;
