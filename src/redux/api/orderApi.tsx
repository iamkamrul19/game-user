import { IOrder, IPaginationResponse, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<
      IPaginationResponse<IOrder>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: routes.order.myOrder(page, limit),
        method: "GET",
        token: true,
      }),
      providesTags: ["my-orders"],
    }),
    getSingleOrder: builder.query<IResponse<IOrder>, { id: string }>({
      query: ({ id }) => ({
        url: routes.order.mySingleOrder(id),
        method: "GET",
        token: true,
      }),
      providesTags: ["single-order"],
    }),
  }),
});

export const { useGetMyOrdersQuery, useLazyGetSingleOrderQuery } = orderApi;
