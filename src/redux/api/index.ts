import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = process.env.API_BASE_URL as string;

interface CustomBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  token?: boolean;
  headers?: Record<string, string>;
}

const axiosBaseQuery =
  (): BaseQueryFn<CustomBaseQueryArgs, unknown, unknown> =>
  async ({
    url,
    method = "GET",
    data,
    params,
    token = true,
    headers: customHeaders = {},
  }) => {
    try {
      const resolvedBaseUrl = API_BASE_URL;

      // Base headers
      const baseHeaders: Record<string, string> = {
        Accept: "application/json",
      };

      // Set Content-Type based on data type
      if (data instanceof FormData) {
        baseHeaders["Content-Type"] = "multipart/form-data";
      } else {
        baseHeaders["Content-Type"] = "application/json";
      }

      if (token) {
        const authToken = Cookies.get("token");
        if (!authToken) {
          console.error("Token is missing.");
          return {
            error: { status: 401, data: { message: "Unauthenticated" } },
          };
        }
        baseHeaders["Authorization"] = `Bearer ${authToken}`;
      }

      const headers = {
        ...baseHeaders,
        ...customHeaders,
      };

      // Axios request
      const response = await axios({
        url: `${resolvedBaseUrl}${url}`,
        method,
        data,
        params,
        headers,
      });

      return { data: response.data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle unauthorized status
      if (error.response?.status === 401) {
        // Remove the token
        // Redirect to logout
        // Router.push("/logout");
      }

      return {
        error: {
          status: error?.response?.status || 500,
          data: error?.response?.data || {},
        },
      };
    }
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "landing-page-settings",
    "landing-page-home",
    "game-categories",
    "me",
    "wish-list",
    "country-list",
    "my-orders",
    "single-order",
    "dashbaord",
  ],
  endpoints: () => ({}),
});
