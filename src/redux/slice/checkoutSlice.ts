import { IBillingAddress, ICheckoutGame, IGame } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { checkoutApi } from "../api/checkoutApi";

interface InitialState {
  cartLoading: boolean;
  payment_method_id: string;
  coupon_code: string;
  ip: string;
  country: string;
  games: ICheckoutGame[];
  similar_games: IGame[];
  total_price: number;
  discount_price: number;
  coupon_discount: number;
  vat_price: number;
  vat_percentage: number;
  official_price: number;
  gateway_fee: number;
  billing_address: IBillingAddress;
  transaction_id: string | null;
}

const initialState: InitialState = {
  cartLoading: false,
  payment_method_id: "",
  coupon_code: "",
  ip: "",
  country: "BD",
  games: [],
  similar_games: [],
  total_price: 0,
  discount_price: 0,
  coupon_discount: 0,
  gateway_fee: 0,
  vat_price: 0,
  vat_percentage: 0,
  official_price: 0,
  billing_address: {
    address: "",
    country: "",
    full_name: "",
    phone_number: "",
  },
  transaction_id: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCoupon(state, action: PayloadAction<string>) {
      state.coupon_code = action.payload;
    },
    setCheckoutGames(state, action: PayloadAction<ICheckoutGame[]>) {
      state.games = action.payload;
    },
    removeCheckoutGame(state, action: PayloadAction<ICheckoutGame>) {
      const data = state.games.filter((item) => item.id !== action.payload.id);
      state.games = data;
      if (data?.length) {
        Cookies.set("checkout", JSON.stringify(state.games), {
          expires: 1 / 24,
        });
      } else {
        Cookies.remove("checkout");
      }
      toast.success("Game is removed from checkout");
    },
    setCheckoutGame(
      state,
      action: PayloadAction<{
        action: "add" | "remove";
        data: ICheckoutGame;
      }>
    ) {
      const data = state.games.find(
        (item) => item.id === action.payload.data.id
      );
      if (data?.id) {
        const newData = state.games.map((item) => {
          if (item.id === action.payload.data.id) {
            return {
              ...item,
              quantity:
                action.payload.action === "remove"
                  ? item.quantity - 1
                  : item.quantity + 1,
            };
          }
          return item;
        });
        state.games = newData?.filter((item) => item.quantity > 0);
      } else {
        state.games = [...state.games, action.payload.data];
      }
      // const totalValue = state.games.reduce(
      //   (sum, game) => sum + game.offer_price * game.quantity,
      //   0
      // );
      // state.total = totalValue || 0;
      //  { expires: 1 / 24 }
      Cookies.set("checkout", JSON.stringify(state.games));
      toast.success("Game added successfully");
    },
    setSimilarGames(state, action: PayloadAction<IGame[]>) {
      state.similar_games = action.payload;
    },
    setCartLoading(state, action: PayloadAction<boolean>) {
      state.cartLoading = action.payload;
    },
    setBilingAddress(state, action: PayloadAction<IBillingAddress>) {
      state.billing_address = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.payment_method_id = action.payload;
    },
    setTransactionId(state, action: PayloadAction<string | null>) {
      state.transaction_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      checkoutApi.endpoints.addToCart.matchFulfilled,
      (state, { payload }) => {
        const { statusCode, success, data } = payload;
        if (statusCode === 200 && success) {
          state.total_price = data.total_price;
          state.coupon_discount = data.coupon_discount;
          state.discount_price = data.discount_price;
          state.billing_address = data.billing_address;
          state.official_price = data.official_price;
          state.coupon_discount = data.coupon_discount;
          state.vat_price = data.vat_price;
          state.vat_percentage = data.vat_percentage;
          state.similar_games = data.similar_games;
        }
      }
    );
  },
});

export const {
  setCoupon,
  setCheckoutGame,
  setCheckoutGames,
  removeCheckoutGame,
  setSimilarGames,
  setCartLoading,
  setBilingAddress,
  setCountry,
  setPaymentMethod,
  setTransactionId,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
