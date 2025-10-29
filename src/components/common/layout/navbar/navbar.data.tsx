import PCIcon from "@/components/icons/PCIcon";
import PSIcon from "@/components/icons/PSIcon";
import XboxIcon from "@/components/icons/XboxIcon";
import { ILanderNav } from "./navbar.types";

export const LANDER_NAVS: ILanderNav[] = [
  {
    title: "PC",
    link: "/pc",
    icon: <PCIcon fillOpacity={0.6} />,
    type: "link",
  },
  {
    title: "PlayStation",
    link: "/play-station",
    icon: <PSIcon fillOpacity={0.6} />,
    type: "link",
  },
  {
    title: "Xbox",
    link: "/xbox-icon",
    icon: <XboxIcon fillOpacity={0.6} />,
    type: "link",
  },
  {
    title: "Collection",
    link: "/collection",
    type: "link",
  },
  {
    title: "GG Plus",
    link: "/gg-plus",
    type: "button",
  },
  {
    title: "Trending",
    link: "/trending",
    type: "link",
  },
  {
    title: "Support",
    link: "/support",
    type: "link",
  },
];
