"use client";

import { seIsAuthenticated, setAuthUser } from "@/redux/slice/authSlice";

import Cookies from "js-cookie";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { TAB_MENU } from "./dashboard.data";

const TabMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token cookie
    Cookies.remove("token");
    // Reset auth state
    dispatch(setAuthUser(null));
    dispatch(seIsAuthenticated(false));
    // Redirect to login
    router.push("/login");
  };

  console.log("✌️pathName --->", pathName);
  return (
    <div className="mt-10 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-4">
      <div className="flex justify-between items-center gap-5 overflow-x-auto">
        {TAB_MENU.map((item) => (
          <Link
            className={`text-nowrap text-[12px] mb-1.5 lg:mb-0 leading-[18px] font-inter font-semibold text-white/80 flex items-center gap-2.5 py-2 px-[14px] hover:bg-[#2C2C2C] hover:text-white rounded-[50px] ${
              pathName.endsWith(item.link) ? "bg-[#2C2C2C]" : ""
            }`}
            href={`${
              item?.link === "/dashboard"
                ? "/dashboard"
                : `/dashboard/${item.link}`
            }`}
            key={item.link}
          >
            {item.link === "/dashboard" && (
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.84639 10.9818C3.59753 11.313 3.66423 11.7831 3.99536 12.032C4.32648 12.2808 4.79665 12.2141 5.0455 11.883L3.84639 10.9818ZM6.43243 8.78919L7.03199 9.23978L7.0332 9.23817L6.43243 8.78919ZM7.51081 8.58649L7.91141 7.95242L7.90754 7.95001L7.51081 8.58649ZM9.44865 9.81081L9.85151 9.17819L9.84924 9.17676L9.44865 9.81081ZM10.5595 9.57568L11.1841 9.99079L11.1845 9.99014L10.5595 9.57568ZM13.1791 6.98204C13.408 6.63682 13.3137 6.1714 12.9685 5.94249C12.6233 5.71359 12.1579 5.80788 11.929 6.1531L13.1791 6.98204ZM5.86486 2.25H11.1351V0.75H5.86486V2.25ZM11.1351 2.25C13.4077 2.25 15.25 4.09229 15.25 6.36486H16.75C16.75 3.26386 14.2361 0.75 11.1351 0.75V2.25ZM15.25 6.36486V11.6351H16.75V6.36486H15.25ZM15.25 11.6351C15.25 13.9077 13.4077 15.75 11.1351 15.75V17.25C14.2361 17.25 16.75 14.7361 16.75 11.6351H15.25ZM11.1351 15.75H5.86486V17.25H11.1351V15.75ZM5.86486 15.75C3.59229 15.75 1.75 13.9077 1.75 11.6351H0.25C0.25 14.7361 2.76386 17.25 5.86486 17.25V15.75ZM1.75 11.6351V6.36486H0.25V11.6351H1.75ZM1.75 6.36486C1.75 4.09229 3.59229 2.25 5.86486 2.25V0.75C2.76386 0.75 0.25 3.26386 0.25 6.36486H1.75ZM5.0455 11.883L7.03199 9.23978L5.83287 8.3386L3.84639 10.9818L5.0455 11.883ZM7.0332 9.23817C7.04232 9.22596 7.0557 9.21762 7.07068 9.21481L6.79357 7.74062C6.40913 7.81289 6.06584 8.02687 5.83167 8.34021L7.0332 9.23817ZM7.07068 9.21481C7.08566 9.21199 7.10114 9.2149 7.11408 9.22296L7.90754 7.95001C7.57558 7.74309 7.17802 7.66836 6.79357 7.74062L7.07068 9.21481ZM7.11022 9.22054L9.04805 10.4449L9.84924 9.17676L7.91141 7.95243L7.11022 9.22054ZM9.04579 10.4434C9.39051 10.6629 9.80758 10.7385 10.2074 10.6539L9.89676 9.18639C9.88119 9.18969 9.86494 9.18675 9.85151 9.17819L9.04579 10.4434ZM10.2074 10.6539C10.6072 10.5692 10.9579 10.3312 11.1841 9.99079L9.93482 9.16056C9.92601 9.17382 9.91234 9.18309 9.89676 9.18639L10.2074 10.6539ZM11.1845 9.99014L13.1791 6.98204L11.929 6.1531L9.93439 9.16121L11.1845 9.99014Z"
                  fill="white"
                />
              </svg>
            )}
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex justify-end lg:items-center lg:justify-between gap-2.5">
        {pathName === "/dashboard" && (
          <Button
            variant="yellow"
            className="bg-[#161616] rounded-[50px] !py-[4px]"
            parentClassName="rounded-[50px]"
          >
            <svg
              className="size-[16px]"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.43551 9.50008C5.81534 9.50016 6.17958 9.65111 6.44812 9.91973L7.16424 10.6359L7.88037 9.91973C8.14891 9.65111 8.51315 9.50016 8.89297 9.50008H11.7747C12.2537 9.50013 12.719 9.66028 13.0965 9.95507C13.4741 10.2499 13.7423 10.6624 13.8586 11.1271L14.304 12.9074C14.3287 12.9992 14.3348 13.095 14.322 13.1893C14.3092 13.2835 14.2778 13.3742 14.2296 13.4561C14.1813 13.5381 14.1173 13.6096 14.0412 13.6665C13.965 13.7235 13.8783 13.7647 13.786 13.7877C13.6938 13.8108 13.5979 13.8152 13.5039 13.8008C13.4099 13.7864 13.3198 13.7535 13.2387 13.7039C13.1576 13.6543 13.0871 13.589 13.0315 13.5119C12.9759 13.4348 12.9362 13.3473 12.9147 13.2547L12.47 11.4752C12.4314 11.3202 12.342 11.1825 12.2161 11.0842C12.0903 10.9858 11.9351 10.9324 11.7754 10.9323H8.89297L8.17684 11.6485C7.90826 11.917 7.54402 12.0678 7.16424 12.0678C6.78446 12.0678 6.42023 11.917 6.15164 11.6485L5.43551 10.9323H2.55382C2.39408 10.9324 2.23894 10.9858 2.11307 11.0842C1.9872 11.1825 1.89783 11.3202 1.85918 11.4752L1.41375 13.2547C1.39227 13.3473 1.35257 13.4348 1.29695 13.5119C1.24134 13.589 1.17092 13.6543 1.08982 13.7039C1.00871 13.7535 0.918543 13.7864 0.824563 13.8008C0.730583 13.8152 0.634678 13.8108 0.54244 13.7877C0.450203 13.7647 0.363481 13.7235 0.287332 13.6665C0.211184 13.6096 0.147134 13.5381 0.0989182 13.4561C0.0507025 13.3742 0.0192865 13.2835 0.00650289 13.1893C-0.00628074 13.095 -0.000176204 12.9992 0.0244606 12.9074L0.469175 11.1271C0.58542 10.6624 0.853643 10.2499 1.23122 9.95507C1.6088 9.66028 2.07407 9.50013 2.5531 9.50008H5.43551ZM7.16424 0.19043C7.72569 0.19043 8.35373 0.326494 8.86862 0.470435C10.0595 0.802002 10.7449 1.9163 10.7449 3.05279V5.92159C10.7449 7.0588 10.0595 8.17238 8.86862 8.50394C8.35373 8.64717 7.72569 8.78395 7.16424 8.78395C6.6028 8.78395 5.97476 8.64789 5.45986 8.50394C4.26894 8.17238 3.58361 7.0588 3.58361 5.92159V3.05279C3.58361 1.9163 4.26894 0.802002 5.45986 0.470435C5.97476 0.32721 6.6028 0.19043 7.16424 0.19043ZM7.16424 1.62268C6.79973 1.62268 6.32136 1.71721 5.84442 1.85041C5.36605 1.98361 5.01586 2.45697 5.01586 3.05279V5.92159C5.01586 6.51741 5.36605 6.99077 5.84442 7.12468C6.32136 7.25717 6.79973 7.3517 7.16424 7.3517C7.52875 7.3517 8.00712 7.25717 8.48406 7.12397C8.96244 6.99077 9.31262 6.51741 9.31262 5.92159V3.05279C9.31262 2.45697 8.96244 1.98361 8.48406 1.84969C8.00712 1.71793 7.52947 1.62268 7.16424 1.62268Z"
                fill="url(#paint0_linear_570_898)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_570_898"
                  x1="-1.53519"
                  y1="0.190428"
                  x2="19.404"
                  y2="2.0378"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F8C431" />
                  <stop offset="1" stop-color="#FF6400" />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-gradient">Seller ID</span>
          </Button>
        )}

        <Link
          className="bg-[#143343] py-2 px-[14px] rounded-[50px] font-inter text-white/80 text-[12px] leading-[18px] font-semibold flex justify-center items-center gap-2"
          href={"/dashboard/setting"}
        >
          <Settings className="size-[16px]" />
          Setting
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-[#FF4444] to-[#FF6B35] py-2 px-[14px] rounded-[50px] font-inter text-white text-[12px] leading-[18px] font-semibold flex justify-center items-center gap-2 hover:from-[#FF5555] hover:to-[#FF7B4A] transition-all shadow-lg hover:shadow-xl cursor-pointer"
        >
          <LogOut className="size-[16px]" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TabMenu;
