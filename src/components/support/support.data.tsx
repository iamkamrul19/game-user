import { MailIcon, RefreshCcw } from "lucide-react";
import BoxIcon from "../icons/BoxIcon";
import CardIcon from "../icons/CardIcon";
import IssueIcon from "../icons/IssueIcon";
import PartnerIcon from "../icons/PartnerIcon";
import LockIcon from "../icons/LockIcon";

export const SUPPORT_DATA = [
  {
    title: "Issue with product",
    description: "Support for key activation and product information.",
    icon: <BoxIcon className="text-[#ADEE68]" />,
  },
  {
    title: "Payment & Verification",
    description: "Support for payment and verification",
    icon: <CardIcon className="text-[#ADEE68]" />,
  },
  {
    title: "Others issue",
    description: "Support for key activation and product information.",
    icon: <IssueIcon className="text-[#ADEE68]" />,
  },
  {
    title: "Account, info & Partnership",
    description: "Support for key activation and product information.",
    icon: <PartnerIcon className="text-[#ADEE68]" />,
  },
];

export const COMMON_SERVICES = [
  {
    title: "Forgot email address",
    icon: <MailIcon className="text-white/40 size-[18px]" />,
  },
  {
    title: "Forgot password",
    icon: <LockIcon className="text-white/40 size-[18px]" />,
  },
  {
    title: "Recover your account",
    icon: <RefreshCcw className="text-white/40 size-[18px]" />,
  },
  {
    title: "Most common issues",
    icon: <RefreshCcw className="text-white/40 size-[18px]" />,
  },
];
