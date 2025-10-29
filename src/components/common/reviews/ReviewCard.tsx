import Image from "next/image";
import RatingStar from "../RatingStar";
import { IReview } from "@/types";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <div className="bg-[#232323] rounded-[23px] px-[30px] py-[33px] min-h-[300px] w-full lg:max-w-[350px]">
      <div className="flex items-center gap-6">
        <div className="size-[54px] rounded-full bg-white">
          {review?.user_image ? (
            <Image
              src={review?.user_image}
              height={54}
              width={54}
              alt="review"
            />
          ) : null}
        </div>
        <div>
          <h5 className="text-white font-inter text-[14px] leading-[21px] font-medium">
            {review?.user_name}
          </h5>
          <p className="text-white/80 font-inter text-[14px] leading-[23px]">
            {review?.user_status}
          </p>
        </div>
      </div>
      <RatingStar num={review?.rating} className="mt-6" />
      <p className="mt-4 text-white text-[16px] leading-[23px] font-medium line-clamp-6">
        {review?.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
