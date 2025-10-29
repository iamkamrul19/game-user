import { IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const commonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getHome: builder.query<IResponse<any>, void>({
      query: () => ({
        url: routes.common.home(),
        method: "GET",
        token: true,
      }),
    }),
  }),
});

export const { useGetHomeQuery } = commonApi;
