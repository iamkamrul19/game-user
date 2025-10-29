export const routes = {
  auth: {
    login: () => "/auth/login",
    register: () => `/auth/register`,
    forgetPassword: () => `/auth/forget-password`,
    verifyEmail: () => "/auth/verify-email",
    resendEmailOtp: () => "/auth/resend-email-otp",
    passwordChange: () => "/auth/password-change",
    me: () => "/auth/me",
  },
  common: {
    home: () => `/home`,
  },
  landingPage: {
    settings: () => `/landing-page/settings`,
    home: () => `/landing-page/home`,
  },
  game: {
    allGames: (
      page: number,
      limit: number,
      platform?: string,
      genre?: string,
      min_price?: number,
      max_price?: number,
      sortBy?: string,
      sortOrder?: string,
      search?: string,
      is_stock?: boolean
    ) =>
      `/games/all-games-public?page=${page}&limit=${limit}${
        platform ? `&platform=${platform}` : ""
      }${genre ? `&genre=${genre}` : ""}${
        min_price ? `&min_price=${min_price}` : ""
      }${max_price && max_price > 0 ? `&max_price=${max_price}` : ""}${
        sortBy ? `&sortBy=${sortBy}` : ""
      }${sortOrder ? `&sortOrder=${sortOrder}` : ""}${
        search ? `&search=${search}` : ""
      }${is_stock ? `&is_stock=${is_stock}` : ""}`,
    getCategories: () => `/games/categories`,
    getSingleGameById: (gameId: string) =>
      `/games/single-game-public/${gameId}`,
  },

  collection: {
    getList: (search?: string | undefined) =>
      `/collection/list${search ? `?search=${search}` : ""}`,
    getCollection: (id: string) => `/collection/list/${id}`,
  },

  review: {
    create: () => `/review`,
    getMyReviews: () => `/review/my-reviews`,
  },

  offer: {
    getMonthlyOfferList: () => `/offer/public`,
  },

  wishList: {
    getPaginationList: (
      page: number,
      limit: number,
      sortBy?: string | undefined,
      sortOrder?: string | undefined
    ) =>
      `/wishlist?page=${page}&limit=${limit}${
        sortBy ? `&sortBy=${sortBy}` : ""
      }${sortOrder ? `&sortOrder=${sortOrder}` : ""}`,
  },

  image: {
    imageUpload: () => `/image-upload`,
  },

  user: {
    personalInfo: () => `/user/personal-info`,
    communicationInfo: () => `/user/communication-info`,
    currencyInfo: () => `/user/currency-info`,
    languageInfo: () => `/user/language-info`,
    changePassword: () => `/user/password-change`,
    changeEmail: () => `/user/email-change`,
  },
  checkout: {
    addToCart: () => `/checkout/add-to-cart`,
    makePayment: () => `/checkout/make-payment`,
    confirmOrder: () => `/checkout/confirm-order`,
  },
  country: {
    get: () => `/country`,
  },
  payment: {
    get: () => `/payment-method/lander-payment-method`,
  },
  order: {
    myOrder: (page: number, limit: number) =>
      `/order/my-order?page=${page}&limit=${limit}`,
    mySingleOrder: (id: string) => `/order/order/${id}`,
  },
  tempAccess: {
    viewRequest: () => `/temp-access/view-request`,
    viewRequestVerify: () => `/temp-access/view-request-verify`,
  },
  dashboard: {
    get: () => `/dashboard`,
  },
};
