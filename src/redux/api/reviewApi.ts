import { IResponse, IReview } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createReview: builder.mutation<IResponse<IReview>, { payload: any }>({
      query: ({ payload }) => ({
        url: routes.review.create(),
        method: "POST",
        data: { ...payload, rating: Number(payload?.rating) },
        token: true,
      }),
    }),
    getMyReviews: builder.query<IResponse<IReview[]>, void>({
      query: () => ({
        url: routes.review.getMyReviews(),
        method: "GET",
        token: true,
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetMyReviewsQuery } = reviewApi;
