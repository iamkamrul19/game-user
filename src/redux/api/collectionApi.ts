import { ICollection, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionList: builder.query<
      IResponse<ICollection[]>,
      { search: string | undefined }
    >({
      query: ({ search }) => ({
        url: routes.collection.getList(search),
        method: "GET",
        token: false,
      }),
    }),
    getSingleCollection: builder.query<IResponse<ICollection>, { id: string }>({
      query: ({ id }) => ({
        url: routes.collection.getCollection(id),
        method: "GET",
        token: false,
      }),
    }),
  }),
});

export const { useGetCollectionListQuery, useLazyGetSingleCollectionQuery } =
  collectionApi;
