import { AuthAction, IAuthUser, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";
import { setGlobalError, setGlobalLoading } from "../slice/globalSlice";

interface AuthResponse {
  action: AuthAction;
  user: IAuthUser;
  token: string;
  data: {
    message: string;
    session: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      IResponse<AuthResponse>,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: "POST",
        url: routes.auth.login(),
        data: { email, password },
        token: false,
      }),
    }),
    register: builder.mutation<
      IResponse<AuthResponse>,
      {
        full_name: string;
        email: string;
        birth_date: string;
        phone_number: string;
        password: string;
        confirm_password: string;
        user_ip: string;
      }
    >({
      query: ({
        email,
        password,
        birth_date,
        confirm_password,
        full_name,
        phone_number,
        user_ip,
      }) => ({
        method: "POST",
        url: routes.auth.register(),
        data: {
          email,
          password,
          full_name,
          birth_date,
          confirm_password,
          phone_number,
          user_ip,
        },
        token: false,
      }),
    }),
    verifyEmail: builder.mutation<
      IResponse<AuthResponse>,
      { email: string; otp: string }
    >({
      query: ({ email, otp }) => ({
        method: "POST",
        url: routes.auth.verifyEmail(),
        data: { email, otp },
        token: false,
      }),
    }),
    resendEmailOtp: builder.mutation<
      IResponse<AuthResponse>,
      { email: string }
    >({
      query: ({ email }) => ({
        method: "POST",
        url: routes.auth.resendEmailOtp(),
        data: { email },
        token: false,
      }),
    }),
    forgetPassword: builder.mutation<
      IResponse<AuthResponse>,
      { email: string }
    >({
      query: ({ email }) => ({
        method: "POST",
        url: routes.auth.forgetPassword(),
        data: { email },
        token: false,
      }),
    }),
    getMe: builder.query<IResponse<{ token: string; user: IAuthUser }>, void>({
      query: () => ({
        url: routes.auth.me(),
        token: true,
      }),
      providesTags: ["me"],
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendEmailOtpMutation,
  useForgetPasswordMutation,
  useGetMeQuery,
} = authApi;
