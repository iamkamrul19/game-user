import { IBillingAddress, ICheckoutGame, IGame, IResponse } from "@/types";
import { api } from ".";
import { routes } from "../routes";

interface IAddToCart {
  payment_method_id: string;
  coupon_code: string;
  ip: string;
  games: ICheckoutGame[];
}

interface IMakePayment extends IAddToCart {
  country: string;
  billing_address: IBillingAddress;
}

interface IAddToCartResponse {
  cart_items: IAddToCart;
  similar_games: IGame[];
  total_price: number;
  discount_price: number;
  coupon_discount: number;
  vat_price: number;
  vat_percentage: number;
  official_price: number;
  gateway_fee: number;
  billing_address: IBillingAddress;
}

interface IMakePaymentResponse {
  transaction_id: string;
  order_id: string;
}

const convertToObject = (values: ICheckoutGame[]) => {
  return values.map((item) => ({
    ...item,
    user_info: item.fields
      ? item.fields.reduce<Record<string, string>>((acc, item) => {
          acc[item.title] = item.value;
          return acc;
        }, {})
      : null,
  }));
};

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<
      IResponse<IAddToCartResponse>,
      {
        data: IAddToCart;
      }
    >({
      query: ({ data }) => ({
        url: routes.checkout.addToCart(),
        method: "POST",
        token: true,
        data: {
          ...data,
          games: convertToObject(data.games),
        },
      }),
    }),
    makePayment: builder.mutation<
      IResponse<IMakePaymentResponse>,
      {
        data: IMakePayment;
      }
    >({
      query: ({ data }) => ({
        url: routes.checkout.makePayment(),
        method: "POST",
        token: true,
        data: {
          ...data,
          games: convertToObject(data.games),
        },
      }),
    }),
    confirmOrder: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IResponse<any>,
      {
        transaction_id: string;
      }
    >({
      query: ({ transaction_id }) => ({
        url: routes.checkout.confirmOrder(),
        method: "POST",
        token: true,
        data: {
          transaction_id,
        },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useMakePaymentMutation,
  useConfirmOrderMutation,
} = checkoutApi;
