import TimerCard from "@/components/common/TimerCard";
import { useCountdownTimer } from "@/hooks/useCountdowTimer";
import { IHeroSection1 } from "@/types";

interface Props {
  hero: IHeroSection1;
}

const HeroL1 = ({ hero }: Props) => {
  const { days, hours, minutes, seconds } = useCountdownTimer(
    new Date(),
    hero?.offer_end
  );
  return (
    <section className="relative">
      <div
        className="w-full h-[420px] lg:h-[650px] relative font-poppins before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(270deg,rgba(0,0,0,0.17)_-1.18%,#00000033_87.33%)] before:z-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.17) 100%), url(${hero?.image_desktop})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%)",
        }}
      >
        <div className="main-container z-10 py-[90px] lg:py-[150px]">
          <div className="max-w-[430px] relative">
            <div className="flex gap-1.5">
              <TimerCard title="day" value={days} />
              <TimerCard title="hr" value={hours} />
              <TimerCard title="min" value={minutes} />
              <TimerCard title="sec" value={seconds} />
            </div>
            <h1 className="text-[36px] leading-[46px] font-bold text-white mt-5">
              {hero?.title || ""}
            </h1>
            <p className="text-[13px] font-inter text-white/80 mt-5 ">
              {hero?.subtitle || ""}
            </p>
            <div className="flex items-center gap-3 mt-5 z-10">
              <p className="text-[20px] leading-[30px] font-semibold font-poppins text-white/60 line-through">
                TK {hero?.home_price}
              </p>
              <p className="text-[20px] leading-[30px] font-semibold font-poppins text-[#ADEE68] ">
                TK {hero?.home_offer_price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroL1;
