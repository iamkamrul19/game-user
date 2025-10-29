import { LANDING_PAGE, OPTION_TYPE, STATUS } from "@/enum";
export type UserType = "super_admin" | "manager";

export type AuthAction =
  | "EMAIL_VERIFICATION"
  | "CHANGE_PASSWORD"
  | "TWO_FACTOR_AUTH";

export interface IAuthUser {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  birth_date: Date;
  permissions: Permissions[];
  user_type: UserType;
  language: string;
  currency: string;
  provider: string;
  two_factor_enabled: boolean;
  is_verified: boolean;
  user_id: string;
  profile_picture: string;
  createdAt: Date;
  social_links: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  level: number;
  communications: {
    news: boolean;
    promotions: boolean;
    purchase_review: boolean;
    pending_cart: boolean;
    pre_order: boolean;
    delivery_keys: boolean;
  };
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  new_games: number;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IPaginationResponse<T> {
  statusCode: number;
  status: boolean;
  message: string;
  data: {
    meta: IPagination;
    data: T[];
  };
}

export interface ISocialLink {
  instagram: string;
  facebook: string;
  twitter: string;
  discord: string;
  youtube: string;
  telegram: string;
  _id: string | null;
}

export interface ILandingPageSetting {
  id: LANDING_PAGE;
  social_links: ISocialLink;
  offer: IOffer;
}

export interface IOffer {
  image_desktop: string;
  image_mobile: string;
  offer_start: Date;
  offer_end: Date;
  show_offer: boolean;
  button_link: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IJoinNow {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: string;
  mockup_image: string;
}

export interface IHeroSection1 {
  title: string;
  image_desktop: string;
  subtitle: string;
  home_price: number;
  home_offer_price: number;
  offer_end: Date;
  game_id: string;
  show_offer: boolean;
}

export interface IHeroSection2 {
  image_desktop: string;
  image_mobile: string;
  game_id: string;
  show_offer: boolean;
  image_minimized: string;
}

export interface ITwoGame {
  game_id: string;
  image_url: string;
  logo: string;
  title: string;
  price: number;
  offer_price: number;
  discount: number;
}

export interface IRequirement {
  installation: string;
  processor: string;
  memory: string;
  storage: string;
  graphics: string;
  others: string;
}

export interface ISystemRequirements {
  operating_system: string;
  minimum_system_requirements: IRequirement;
  recommended_system_requirements: IRequirement;
  _id: string;
}

export interface ICurrentOffer {
  start_date: Date;
  end_date: Date;
  games: {
    title: string;
    game_id: string;
    offer: number;
    price: number;
    offer_price: number;
    image_url: string[];
  }[];
  show_offer: boolean;
}

export interface IPreOrders {
  auto_result: boolean;
  games: {
    title: string;
    image_url: string;
    game_id: string;
    price: number;
    offer_price: number;
    pre_order_date: Date;
    show_pre_order: boolean;
    _id: string;
  }[];
}

export interface IWeeklyDeal {
  game_id: string;
  image_url: string;
  title: string;
  price: number;
  offer_price: number;
  offer_end: Date;
  show_offer: boolean;
}

export interface IFeatured {
  game_id: string;
  collection_id: string;
  image_url: string;
  title: string;
  price: number;
  offer_price: number;
  show_featured_game: boolean;
}

export interface ICustomGame {
  title: string;
  price: number;
  game_id: string;
  offer_price: number;
  custom_game_id: string;
  is_modified: boolean;
}

export interface IHome {
  id: LANDING_PAGE;
  offers: IOffer;
  hero_section: IHeroSection1[] | IHeroSection2[];
  pre_order_games: IPreOrders;
  two_game_section: ITwoGame[];
  best_games: {
    game_ids: string[];
    auto_result: boolean;
    games: ISectionGame[];
  };
  current_offer: ICurrentOffer;
  recommended_games: {
    game_ids: string[];
    auto_result: boolean;
    games: ISectionGame[];
  };
  trending_games: {
    game_ids: string[];
    auto_result: boolean;
    games: ISectionGame[];
  };
  featured_game: IFeatured;
  weekly_deals: IWeeklyDeal[];
  faqs: IFaq[];
  join_now: IJoinNow;
  social_links: ISocialLink;
}

export interface IGame {
  id: string;
  title: string;
  platform: string;
  source: string;
  edition: string;
  category: string;
  images: string[];
  videos: string[];
  price: number;
  offer_price: number;
  stock: number;
  purchase_price: number;
  need_user_info: {
    is_required: boolean;
    customer_notes: string;
    fields: {
      type: OPTION_TYPE;
      title: string;
      content: string;
      options: string[];
      _id: string;
    }[];
  };
  custom_games: ICustomGame[];
  description: string;
  release_date: string;
  genre: string;
  publisher: string;
  developer: string;
  tags: string[];
  features: {
    values: string[];
    in_app_purchase: boolean;
  };
  system_requirements: ISystemRequirements[];
  others_edition: {
    auto_generated: boolean;
    games: IGame[];
  };
  similar_games: {
    auto_generated: boolean;
    games: IGame[];
  };
  status: STATUS;
  is_modified: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating_section: {
    total_reviews: number;
    average_rating: number;
    reviews: IReview[];
  };
}

export interface IReview {
  user_id: string;
  user_name: string;
  game_name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  user_status: string;
  user_image: string;
  game_id: string;
  status: string;
}

export interface ISectionGame extends IGame {
  image_url: string[];
  game_id: string;
}

export interface IGameCategory {
  title: string;
  value: string;
  image_url: string;
}

export interface ISelectedGame {
  is_required: boolean;
  game_id: string;
  platform: string;
  title: string;
  price: number;
  offer_price: number;
  stock: number;
  customer_notes: string;
  image_url: string;
}

export interface ICollection {
  id: string;
  title: string;
  game_id: string;
  image_url: string;
  description: string;
  game_ids: string[];
  games: IGame[];
  createdAt: Date;
  updatedAt: Date;
  rating_section: {
    total_reviews: number;
    average_rating: number;
    reviews: IReview[];
  };
}

export interface IMonthlyOfferGame {
  title: string;
  offer_date: Date;
  game_id: string;
  regular_price: number;
  price_increase: number;
  image_url: string;
  is_stop_after_time: boolean;
  is_unlocked: boolean;
}

export interface IMonthlyOffer {
  title: string;
  description: string;
  games: IMonthlyOfferGame[];
}

export interface ICheckoutField {
  title: string;
  field: string;
  value: string;
}

export interface ICheckoutGame {
  id: string;
  title: string;
  platform: string;
  image_url: string;
  price: number;
  offer_price: number;
  quantity: number;
  from_offer: boolean;
  fields: ICheckoutField[];
}

export interface IBillingAddress {
  full_name: string;
  phone_number: string;
  address: string;
  country: string;
}

export interface ICountry {
  name: string;
  code: string;
}

export interface IPaymentMethod {
  id: string;
  name: string;
}

export interface IOrderGame {
  id: string;
  quantity: number;
  price: number;
  is_coupon_applied: boolean;
  coupon_code: string;
  coupon_discount: number;
  is_from_monthly_offer: boolean;
  total_price: number;
  status: string;
  order_id: string;
  game_id: string;
  user_info: string;
  keys: { key: string }[];
}

export interface IOrder {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_ip: string;
  payment_method_id: string;
  payment_method_name: string;
  status: string;
  total_price: string;
  coupon_code: string;
  coupon_discount: string;
  vat_price: number;
  vat_percentage: number;
  gateway_fee: number;
  official_price: number;
  games: IOrderGame[];
  transaction_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDashboard {
  overview: {
    total_wishlist: number;
    total_review: number;
    total_games: number;
    total_refer: number;
  };
  affiliate: {
    code: string;
  };
  wallet: {
    total_wallet: number;
  };
  total_saved: {
    total_saved: number;
  };
}
