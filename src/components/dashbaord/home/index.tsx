"use client";

import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import Overview from "./Overview";
import TotalSaved from "./TotalSaved";

const Dashboard = () => {
  const { data } = useGetDashboardQuery();
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Overview overview={data?.data?.overview || {}} />
      <TotalSaved total_saved={data?.data?.total_saved || {}} />
    </div>
  );
};

export default Dashboard;
