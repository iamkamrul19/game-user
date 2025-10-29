import FreeroomIcon from "@/components/icons/FreeroomIcon";
import MultiPlayerIcon from "@/components/icons/MultiPlayerIcon";
import SinglePlayerIcon from "@/components/icons/SinglePlayerIcon";
import { GAME_FEATURES } from "@/enum";
import { CameraIcon, VideoIcon } from "lucide-react";
import React from "react";

interface Props {
  value: string;
}

const InAppCard = ({ value }: Props) => {
  const getBackgroundColor = (value: string) => {
    if (value === GAME_FEATURES.SINGLE_PLAYER) {
      return "#5D1177";
    } else if (value === GAME_FEATURES.MULTI_PLAYER) {
      return "#252580";
    } else if (value === GAME_FEATURES.FREE_ROOM) {
      return "#064C6F";
    } else if (value === GAME_FEATURES.HRD_SUPPORT) {
      return "#237107";
    } else if (value === GAME_FEATURES.ULTRA_HD) {
      return "#B88F29";
    } else {
      return "";
    }
  };

  const getIcon = (value: string) => {
    if (value === GAME_FEATURES.SINGLE_PLAYER) {
      return <SinglePlayerIcon />;
    } else if (value === GAME_FEATURES.MULTI_PLAYER) {
      return <MultiPlayerIcon />;
    } else if (value === GAME_FEATURES.FREE_ROOM) {
      return <FreeroomIcon />;
    } else if (value === GAME_FEATURES.HRD_SUPPORT) {
      return <VideoIcon />;
    } else if (value === GAME_FEATURES.ULTRA_HD) {
      return <CameraIcon />;
    } else <></>;
  };
  return (
    <div
      className="w-full lg:w-[114px] min-h-[105px] rounded-[10px] py-[17px] flex justify-center items-center px-4"
      style={{ backgroundColor: getBackgroundColor(value) }}
    >
      <span className="text-[12px] leading-5 font-inter font-semibold text-white/80 text-center flex items-center flex-col gap-2">
        {getIcon(value)}
        {value}
      </span>
    </div>
  );
};

export default InAppCard;
