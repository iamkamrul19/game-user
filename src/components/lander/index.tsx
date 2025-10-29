"use client";

import { useGetHomeQuery } from "@/redux/api/landingPageApi";
import WhyGG from "./home/why-gg";
import { IHeroSection1, IHeroSection2, IHome } from "@/types";
import { LANDING_PAGE } from "@/enum";
import HeroL2 from "./home/heroL2";
import HeroL1 from "./home/heroL1";
import TwoGame from "./home/twoGame";
import Service from "./home/service";
// import NewsLetter from "./home/newsLetter";
import Trending from "./home/trending";
import Recommended from "./home/recommended";
import Faq from "./home/faq";
import JoinNow from "./home/joinNow";
import CurrentOffer from "./home/currentOffer";
import PreOrders from "./home/preOrder";
import Categories from "./home/categories";
import BestSeller from "./home/bestSeller";
import WeeklyDeals from "./home/weeklyDeals";
import Featured from "./home/featured";
import GlobalLoader from "../common/loader/GlobalLoader";
import Reviews from "./home/reviews";

const LadingPage = () => {
  const { data } = useGetHomeQuery();
  const home = data?.data || ({} as IHome);

  const isPage2 = home?.id === LANDING_PAGE.PAGE_2;
  const isPage1 = home?.id === LANDING_PAGE.PAGE_1;

  return (
    <div>
      {isPage2 ? (
        <>
          <HeroL2 hero={home?.hero_section as IHeroSection2[]} />
          <Service />
          <Categories />
          <Trending games={home?.trending_games?.games || []} />
          <WhyGG />
          <Recommended games={home?.recommended_games?.games || []} />
          <PreOrders preOrders={home?.pre_order_games || {}} />
          <BestSeller games={home?.best_games?.games || []} />
          <Reviews />
          <WeeklyDeals deals={home?.weekly_deals || []} />
          <Featured featured={home?.featured_game || {}} />
          <Faq faqs={home?.faqs || []} />
          <JoinNow joinNow={home?.join_now || {}} />
          {/* <NewsLetter /> */}
        </>
      ) : isPage1 ? (
        <>
          <HeroL1 hero={home?.hero_section?.[0] as IHeroSection1} />
          <Trending games={home?.trending_games?.games || []} />
          <Categories />
          <Recommended games={home?.recommended_games?.games || []} />
          <WhyGG />
          <PreOrders
            preOrders={home?.pre_order_games || {}}
            className="bg-[#232323]"
          />
          <BestSeller games={home?.best_games?.games || []} />
          <Reviews />
          <TwoGame games={home?.two_game_section || []} />
          <Service />
          <CurrentOffer offer={home?.current_offer || {}} />
          <Faq faqs={home?.faqs || []} />
          <JoinNow joinNow={home?.join_now || {}} />
          {/* <NewsLetter /> */}
        </>
      ) : (
        <GlobalLoader />
      )}
    </div>
  );
};

export default LadingPage;
