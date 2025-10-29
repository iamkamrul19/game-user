import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

interface Props {
  num: number;
  className?: string;
}

const RatingStar = ({ num, className }: Props) => {
  const fullStars = Math.floor(num); // full stars count
  const hasHalfStar = num % 1 >= 0.5; // check if there's a half star
  const totalStars = 5; // you can make this dynamic if needed

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={`full-${i}`} className="text-[#FBB24A]" />
      ))}

      {/* Half star */}
      {hasHalfStar && <FaStarHalfStroke className="text-[#FBB24A]" />}

      {/* Empty stars */}
      {Array.from(
        { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
        (_, i) => (
          <FaStar key={`empty-${i}`} className="text-white/50" />
        )
      )}
    </div>
  );
};

export default RatingStar;
