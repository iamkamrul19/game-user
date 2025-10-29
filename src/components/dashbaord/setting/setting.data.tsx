import { RiUser3Line } from "react-icons/ri";
import { RiChat3Line } from "react-icons/ri";
import { GoGlobe } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import USAFlag from "@/components/icons/USAFlag";
import BDFlag from "@/components/icons/BDFlag";

export const SETTING_TABS = [
  {
    id: "profile",
    label: "Customize your profile",
    subtitle: "Avatar, gamertag and social links",
    icon: <RiUser3Line />,
  },
  {
    id: "cummunication",
    label: "Communications",
    subtitle: "Manage the emails or notifications you want to receive ",
    icon: <RiChat3Line />,
  },
  // {
  //   id: "privacy",
  //   label: "Privacy",
  //   subtitle: "Switch information public or private",
  //   icon: <GoLock />,
  // },
  {
    id: "language",
    label: "Language and currency ",
    subtitle: "Switch the language or the currency you want to use",
    icon: <GoGlobe />,
  },
  {
    id: "email",
    label: "Email, password and 2FA",
    subtitle: "Manage your email, password and two-factor authentication (2FA)",
    icon: <MdOutlineMailOutline />,
  },
];

export const FOLLOW_NEWS = [
  {
    id: "news",
    label: "Receive news from GG (Big game releases, Black friday offers...)",
  },
  {
    id: "promotions",
    label: "Receive this week's promotions by email",
  },
  {
    id: "purchase_review",
    label: "Purchase review reminder",
  },
  {
    id: "pending_cart",
    label: "Pending cart reminder",
  },
];

export const WISHLIST = [
  {
    id: "pre_order",
    label: "Pre-orders are open",
  },
  {
    id: "delivery_keys",
    label: "Delivery of keys",
  },
];

export const COMMUNICATIONS = [
  {
    title: "Follow our news",
    options: FOLLOW_NEWS,
  },
  {
    title: "Wishlist - Receive an email",
    options: WISHLIST,
  },
];

export const LANGUAGES = [
  {
    id: 1,
    name: "en",
    title: "English",
    icon: <USAFlag />,
  },
  {
    id: 2,
    name: "bn",
    title: "Bangla",
    icon: <BDFlag />,
  },
];

export const CURRENCIES = [
  {
    id: 1,
    name: "EUR",
    title: "EUR - Euro (€)",
  },
  {
    id: 2,
    name: "USD",
    title: "USD - United States Dollar ($)",
  },
  {
    id: 3,
    name: "BDT",
    title: "BDT - Bangladeshi Taka (৳ )",
  },
];
