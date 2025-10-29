import { IPaymentMethod, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethod: builder.query<IResponse<IPaymentMethod[]>, void>({
      query: () => ({
        url: routes.payment.get(),
        method: "GET",
        token: true,
      }),
    }),
  }),
});

export const { useGetPaymentMethodQuery } = paymentApi;
