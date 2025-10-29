import { IGame, IPaginationResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const wishListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaginationWishList: builder.query<
      IPaginationResponse<IGame>,
      {
        page: number;
        limit: number;
        sortBy?: string | undefined;
        sortOrder?: string | undefined;
      }
    >({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: routes.wishList.getPaginationList(page, limit, sortBy, sortOrder),
        method: "GET",
        token: true,
      }),
      providesTags: ["wish-list"],
    }),
  }),
});

export const { useGetPaginationWishListQuery } = wishListApi;
