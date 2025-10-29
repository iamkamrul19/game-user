"use client";

import { useGetMyReviewsQuery } from "@/redux/api/reviewApi";
import DashboardTitle from "../DashboardTitle";
import CustomerReviewCard from "@/components/common/reviews/CustomerReviewCard";
import { useAppSelector } from "@/redux/hooks";
import CustomerReviewCardSkeleton from "@/components/common/reviews/CustomerReviewCardSkeleton";

const Review = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isFetching } = useGetMyReviewsQuery();
  const loading = isFetching || isLoading;
  const dataList = data?.data || [];
  return (
    <div className="mt-12">
      <DashboardTitle title={`Reviews`} isLoading={loading} />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <CustomerReviewCardSkeleton key={index} />
            ))
          : dataList?.map((item) => (
              <CustomerReviewCard
                review={{ ...item, user_image: user?.profile_picture || "" }}
                key={item?.id}
              />
            ))}
      </div>
    </div>
  );
};

export default Review;
