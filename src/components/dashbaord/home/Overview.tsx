"use client";

import OverviewIcon from "@/components/icons/OverviewIcon";
import OverviewCount from "./OverviewCount";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overview: any;
}

const Overview = ({ overview }: Props) => {
  return (
    <div className="bg-[#292929] rounded-[20px] p-8">
      <div className="flex items-center gap-3">
        <OverviewIcon className="text-[#ADEE68]" />
        <h1 className="text-white-gradient text-[18px] leading[28px] font-inter font-bold">
          Overview
        </h1>
      </div>
      <div className="mt-9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ml-6">
          <OverviewCount
            count={overview?.total_review?.toString() || "0"}
            title="Review"
          />
          <OverviewCount
            count={overview?.total_wishlist?.toString() || "0"}
            title="Wishlist"
          />
          <OverviewCount
            count={overview?.total_games?.toString() || "0"}
            title="Game"
          />
          <OverviewCount
            count={overview?.total_refer?.toString() || "0"}
            title="Total Refer"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
