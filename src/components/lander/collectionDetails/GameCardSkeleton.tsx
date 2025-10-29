import React from "react";

const GameCardSkeleton = () => {
  return (
    <div className="block min-h-[230px] animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-[164px] rounded-[10px] border-[1px] border-[#444444] overflow-hidden bg-[#2a2a2a]"></div>

      {/* Title placeholder */}
      <div className="mt-6 h-[15px] w-3/4 bg-[#2a2a2a] rounded"></div>

      {/* Subtitle placeholder */}
      <div className="mt-2 h-[12px] w-1/3 bg-[#2a2a2a] rounded"></div>
    </div>
  );
};

export default GameCardSkeleton;
