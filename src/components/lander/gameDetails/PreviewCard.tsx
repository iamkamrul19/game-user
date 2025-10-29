import PlayIcon from "@/components/icons/PlayIcon";
import Image from "next/image";
import React from "react";

interface Props {
  type: "image" | "video";
  url: string;
  onClick: (url: string, type: "image" | "video") => void;
  isSelected: boolean;
  thumbnail?: string;
}

const PreviewCard = ({ url, onClick, isSelected, type, thumbnail }: Props) => {
  let URL = "";
  if (type === "image") {
    URL = url;
  } else if (type === "video") {
    URL = thumbnail || "";
  }
  return (
    <div
      role="button"
      onClick={() => {
        onClick(url, type);
      }}
      className={`w-[120px] min-w-[120px] h-[69px] rounded-[10px] overflow-hidden cursor-pointer relative ${
        isSelected
          ? "border-[2px] border-[#ADEE68]"
          : "border-[1px] border-white/25"
      }`}
    >
      <Image
        className="w-full h-full object-cover object-center"
        src={URL}
        height={69}
        width={120}
        alt="preview"
      />
      {type === "video" && (
        <span className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          <PlayIcon className="text-white" />
        </span>
      )}
    </div>
  );
};

export default PreviewCard;
