import { ICountry, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const countryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountryListList: builder.query<IResponse<ICountry[]>, void>({
      query: () => ({
        url: routes.country.get(),
        method: "GET",
        token: false,
      }),
      providesTags: ["country-list"],
    }),
  }),
});

export const { useGetCountryListListQuery } = countryApi;
