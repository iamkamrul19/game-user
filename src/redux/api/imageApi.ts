import axios from "axios";
import { api } from ".";
import { routes } from "../routes";
import Cookies from "js-cookie";
const API_URL = process.env.API_BASE_URL;
export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    imageUpload: builder.mutation({
      queryFn: async (payload: FormData) => {
        try {
          const token = Cookies.get("token");
          if (!token) {
            return {
              error: {
                status: 401,
                success: false,
                message: "You are not authorized",
                data: [],
              },
            };
          }
          const URL = API_URL + routes.image.imageUpload();
          const response = await axios.post(`${URL}`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
            },
          });
          const data = response.data;
          if (!data || !data.success) {
            return {
              error: {
                status: 400,
                success: false,
                message: data.message || "Image upload failed",
                data: [],
              },
            };
          }
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // console.error("Error uploading image:", error);
          return {
            error: {
              status: error?.status,
              success: false,
              message:
                error?.response?.data?.message || "Internal server error",
              data: [],
            },
          };
        }
      },
    }),
  }),
});

export const { useImageUploadMutation } = imageApi;
