import { IMonthlyOffer, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const offerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    geMonthlytOfferList: builder.query<IResponse<IMonthlyOffer>, void>({
      query: () => ({
        url: routes.offer.getMonthlyOfferList(),
        method: "GET",
        token: false,
      }),
    }),
  }),
});

export const { useGeMonthlytOfferListQuery } = offerApi;
