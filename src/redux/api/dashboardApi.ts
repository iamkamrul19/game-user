import { IDashboard, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatePersonalInfo: builder.mutation<IResponse<any>, { data: any }>({
      query: ({ data }) => ({
        url: routes.user.personalInfo(),
        method: "PATCH",
        token: true,
        data,
      }),
    }),

    updateCommunicationInfo: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      { data: { [key: string]: boolean } }
    >({
      query: ({ data }) => ({
        url: routes.user.communicationInfo(),
        method: "PATCH",
        token: true,
        data: { communications: { ...data } },
      }),
    }),
    updateLangAndCurrInfo: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      { data: { key: string; value: string } }
    >({
      query: ({ data }) => ({
        url:
          data.key === "currency"
            ? routes.user.currencyInfo()
            : routes.user.languageInfo(),
        method: "PATCH",
        token: true,
        data: { [data.key]: data.value },
      }),
    }),
    changePassword: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      {
        data: {
          current_password: string;
          new_password: string;
          confirm_password: string;
        };
      }
    >({
      query: ({ data }) => ({
        url: routes.user.changePassword(),
        method: "PATCH",
        token: true,
        data: { ...data },
      }),
    }),
    changeEmail: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      {
        data: {
          current_email: string;
          new_email: string;
          confirm_new_email: string;
        };
      }
    >({
      query: ({ data }) => ({
        url: routes.user.changeEmail(),
        method: "PATCH",
        token: true,
        data: { ...data },
      }),
    }),
    getDashboard: builder.query<IResponse<IDashboard>, void>({
      query: () => ({
        url: routes.dashboard.get(),
        method: "GET",
        token: true,
      }),
      providesTags: ["dashbaord"],
    }),
  }),
});

export const {
  useUpdatePersonalInfoMutation,
  useUpdateCommunicationInfoMutation,
  useUpdateLangAndCurrInfoMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useGetDashboardQuery,
} = dashboardApi;
