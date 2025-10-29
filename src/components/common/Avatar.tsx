import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
}

const Avatar = ({ imageUrl }: Props) => {
  return (
    <div className="size-[54px] min-h-[54px] min-w-[54px] rounded-full bg-white overflow-hidden border border-white/20">
      {imageUrl ? (
        <Image
          className="w-full h-full object-cover object-center"
          src={imageUrl}
          height={54}
          width={54}
          alt="review"
        />
      ) : null}
    </div>
  );
};

export default Avatar;
