import { ReactNode } from "react";

export interface ILanderNav {
  title: string;
  link: string;
  icon?: ReactNode;
  type: "link" | "button";
}
