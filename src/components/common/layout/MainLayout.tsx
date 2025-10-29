"use client";

import { useGetSettingsQuery } from "@/redux/api/landingPageApi";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import GlobalLoader from "../loader/GlobalLoader";
import { useGetMeQuery } from "@/redux/api/authApi";
import Cookies from "js-cookie";
interface Props {
  children: ReactNode;
}
const MainLayout = ({ children }: Props) => {
  const token = Cookies.get("token");
  const {
    id,
    socialLinks: { _id },
  } = useAppSelector((state) => state.settings);
  const { isGlobalLoading, isLanderLoading } = useAppSelector(
    (state) => state.global
  );
  useGetSettingsQuery(undefined, {
    skip: Boolean(id && _id),
  });
  useGetMeQuery(undefined, {
    skip: !token ? true : false,
  });

  if (isGlobalLoading || isLanderLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#161616]">
        <GlobalLoader className="text-[#8552FE] size-[80px]" />
      </div>
    );
  }

  return <>{children}</>;
};

export default MainLayout;
