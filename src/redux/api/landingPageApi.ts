import { IHome, ILandingPageSetting, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";
import {
  setGlobalError,
  setGlobalLoading,
  setisLanderLoading,
} from "../slice/globalSlice";

export const landingPageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<IResponse<ILandingPageSetting>, void>({
      query: () => ({
        url: routes.landingPage.settings(),
        method: "GET",
        token: false,
      }),
      providesTags: ["landing-page-settings"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setGlobalLoading(true));
        try {
          await queryFulfilled;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          dispatch(
            setGlobalError(error?.data?.message || error?.message || "")
          );
        } finally {
          dispatch(setGlobalLoading(false));
        }
      },
    }),
    getHome: builder.query<IResponse<IHome>, void>({
      query: () => ({
        url: routes.landingPage.home(),
        method: "GET",
        token: false,
      }),
      providesTags: ["landing-page-home"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setisLanderLoading(true));
        try {
          await queryFulfilled;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          dispatch(
            setGlobalError(error?.data?.message || error?.message || "")
          );
        } finally {
          dispatch(setisLanderLoading(false));
        }
      },
    }),
  }),
});

export const { useGetSettingsQuery, useGetHomeQuery } = landingPageApi;
