import { WHY_GG_DATA } from "./why-gg.data";
import WhyGGCard from "./WhyGGCard";

const WhyGG = () => {
  return (
    <section className="text-white font-poppins py-16 lg:py-[62px]">
      <div className="main-container flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[100px]">
        <h2 className="text-[24px] leading-[40px] font-bold max-w-[220px]">
          Why <span className="text-[#ADEE68]">GGSubscriptions?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {
            // Assuming WHY_GG_DATA is imported from why-gg.data.tsx
            WHY_GG_DATA.map((item, index) => (
              <WhyGGCard item={item} key={index} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default WhyGG;
