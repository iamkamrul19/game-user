import SectionTitle from "@/components/common/SectionTitle";
import { IWeeklyDeal } from "@/types";
import React from "react";
import WeeklyCard from "./WeeklyCard";

interface Props {
  deals: IWeeklyDeal[];
}

const WeeklyDeals = ({ deals }: Props) => {
  return (
    <section className="bg-[#001B30] section">
      <div className="main-container">
        <SectionTitle title="Weekly Deals" showIcon={true} />

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-3 gap-[35px]">
          {deals?.map((item) => (
            <WeeklyCard item={item} key={item.game_id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeals;
