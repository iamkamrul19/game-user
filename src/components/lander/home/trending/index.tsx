import SectionTitle from "@/components/common/SectionTitle";
import { ISectionGame } from "@/types";
import TrendingCard from "./TrendingCard";

interface Props {
  games: ISectionGame[];
}

const Trending = ({ games }: Props) => {
  return (
    <section className="bg-[#232323] section relative -mt-[100px] lg:-mt-[150px] pt-[100px] lg:pt-[150px] z-10 trending-clip-path">
      <div className="main-container">
        <SectionTitle title="Trending" showIcon={true} />
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
          {games.map((item) => (
            <TrendingCard key={item.game_id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
