import SectionTitle from "@/components/common/SectionTitle";
import { ISectionGame } from "@/types";
import React from "react";
import RecommendedCard from "./RecommendedCard";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface Props {
  games: ISectionGame[];
}

const Recommended = ({ games }: Props) => {
  return (
    <section className="bg-[#232323] section">
      <div className="main-container">
        <div className="flex justify-between items-center">
          <SectionTitle title="We recommended you" showIcon={true} />
          <Link href={"/"}>
            <Button variant="outline" className="bg-[#2D2D2D]">
              View all
            </Button>
          </Link>
        </div>
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
          {games.map((item) => (
            <RecommendedCard key={item.game_id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
