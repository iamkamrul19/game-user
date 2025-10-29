import { LANDING_PAGE } from "@/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { landingPageApi } from "../api/landingPageApi";
import { ICountry, ISocialLink } from "@/types";
import { countryApi } from "../api/countryApi";

interface State {
  id: LANDING_PAGE;
  socialLinks: ISocialLink;
  offer: {
    button_link: string;
    image_desktop: string;
    image_mobile: string;
    offer_end: Date | null;
    offer_start: Date | null;
    show_offer: false;
  };
  countryList: ICountry[];
}

const initialState: State = {
  id: LANDING_PAGE.PAGE_1,
  socialLinks: {
    facebook: "",
    discord: "",
    instagram: "",
    telegram: "",
    twitter: "",
    youtube: "",
    _id: null,
  },
  offer: {
    button_link: "",
    image_desktop: "",
    image_mobile: "",
    offer_end: null,
    offer_start: null,
    show_offer: false,
  },
  countryList: [],
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLandingPageId(state, action: PayloadAction<LANDING_PAGE>) {
      state.id = action.payload;
    },
    setSocialLinks(state, action: PayloadAction<ISocialLink>) {
      state.socialLinks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      landingPageApi.endpoints.getSettings.matchFulfilled,
      (state, { payload }) => {
        // console.log(meta, type);
        const { statusCode, success, data } = payload;
        if (statusCode === 200 && success) {
          state.id = data?.id || LANDING_PAGE.PAGE_1;
          state.socialLinks = data?.social_links || {};
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.offer = (data?.offer as any) || {};
        }
      }
    );
    builder.addMatcher(
      countryApi.endpoints.getCountryListList.matchFulfilled,
      (state, { payload }) => {
        // console.log(meta, type);
        const { statusCode, success, data } = payload;
        if (statusCode === 200 && success) {
          state.countryList = data || [];
        }
      }
    );
  },
});

export const { setLandingPageId, setSocialLinks } = settingSlice.actions;
export default settingSlice.reducer;
