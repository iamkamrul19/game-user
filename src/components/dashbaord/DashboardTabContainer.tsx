"use client";

import { usePathname } from "next/navigation";
import WishList from "./wishlist";
import MyOrders from "./myOders";
import Review from "./review";
import Setting from "./setting";

const DashboardTabContainer = () => {
  const pathName = usePathname();

  const renderTab = (path: string) => {
    switch (path) {
      case "/dashboard/wishlist":
        return <WishList />;
      case "/dashboard/my-orders":
        return <MyOrders />;
      case "/dashboard/review":
        return <Review />;
      case "/dashboard/setting":
        return <Setting />;
      default:
        return <></>;
        break;
    }
  };
  return <div>{renderTab(pathName)}</div>;
};

export default DashboardTabContainer;
