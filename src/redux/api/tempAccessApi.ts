import { IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const tempAccessApi = api.injectEndpoints({
  endpoints: (builder) => ({
    viewRequest: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      { module: string; view_id: string }
    >({
      query: ({ module, view_id }) => ({
        url: routes.tempAccess.viewRequest(),
        method: "POST",
        token: true,
        data: { module, view_id },
      }),
    }),
    viewRequestVerify: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      { module: string; view_id: string; otp: string }
    >({
      query: ({ module, view_id, otp }) => ({
        url: routes.tempAccess.viewRequestVerify(),
        method: "POST",
        token: true,
        data: { module, view_id, otp },
      }),
    }),
  }),
});

export const { useViewRequestMutation, useViewRequestVerifyMutation } =
  tempAccessApi;
