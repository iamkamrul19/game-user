/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DASHBOARD_PATHS } from "@/components/dashbaord/dashboard.data";
import DashboardHero from "@/components/dashbaord/Hero";
import TabMenu from "@/components/dashbaord/TabMenu";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathName.startsWith("/dashboard/my-orders/order-details")) return;
    if (!DASHBOARD_PATHS.includes(pathName)) {
      router.replace("/dashboard");
    }
  }, [pathName]);

  return (
    <div className="main-container pt-[150px] py-[60px]">
      <DashboardHero />
      <TabMenu />
      {children}
    </div>
  );
};

export default DashboardLayout;
