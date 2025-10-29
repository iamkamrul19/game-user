import PriceSection from "@/components/common/PriceSection";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IFeatured } from "@/types";
import React from "react";

interface Props {
  featured: IFeatured;
}

const Featured = ({ featured }: Props) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <section
      className="section min-h-[577px]"
      style={{
        backgroundImage: `linear-gradient(to left, rgba(22, 22, 22, 0.0) 0%, rgba(22, 22, 22, 0.50) 100%), url('${featured?.image_url}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        clipPath: isMobile
          ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
          : "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)",
      }}
    >
      <div className="main-container mt-[100px]">
        <h3 className="text-[36px] text-white leading-[46px] font-poppins font-bold max-w-[400px]">{featured?.title}</h3>
        <PriceSection price={featured?.price} offerPrice={featured?.offer_price} className="mt-6"  />
      </div>
    </section>
  );
};

export default Featured;
