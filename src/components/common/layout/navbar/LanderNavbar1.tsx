"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";
import MegnifyIcon from "@/components/icons/MegnifyIcon";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Menu, X } from "lucide-react";
import { LANDER_NAVS } from "./navbar.data";
import NavMenu from "./NavMenu";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "@/redux/slice/globalSlice";

interface Props {
  className?: string;
  showOffer: boolean;
}

const LanderNavbar1 = ({ className, showOffer }: Props) => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // You can adjust scroll threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed z-20 w-full flex justify-center items-center transition-all duration-300 ${
          isScrolled
            ? "top-[0px]"
            : showOffer
            ? "top-[70px] lg:top-[80px] px-6 lg:px-0"
            : "top-[38px] px-6 lg:px-0"
        } ${className}`}
      >
        <nav
          className={`flex-1 bg-black/50 border border-white/20 backdrop-blur-[20px] mx-auto py-[13px] lg:py-[18px] flex justify-between items-center transition-[max-width,border-radius,px] duration-500 ease-in-out ${
            isScrolled
              ? "max-w-full rounded-none px-[24px] lg:px-[40px]"
              : "max-w-[1124px] rounded-[12px] lg:rounded-[20px] px-[12px] lg:px-[17px]"
          }`}
        >
          <Link href="/">
            <Image src="/gg-logo.svg" height={33} width={123} alt="gg-logo" />
          </Link>
          <NavMenu />
          <div className="flex items-center gap-3">
            <ul className="hidden lg:flex items-center gap-3">
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px] text-white">
                <ButtonLink icon={<MegnifyIcon />} link="/search" />
              </li>
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px] text-white">
                {/* <ButtonLink icon={<ShoppingIcon />} link="/cart" /> */}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => dispatch(setIsCartOpen(true))}
                >
                  <ShoppingIcon />
                </button>
              </li>
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px] text-white">
                <ButtonLink icon={<UserIcon />} link="/dashboard" />
              </li>
            </ul>
            <button
              className="md:hidden ml-2 text-white"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer remains same */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="w-64 h-full bg-[#1a1a1a] text-white p-6 relative flex flex-col justify-between">
            <button
              className="absolute top-4 right-4"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
            <ul className="mt-10 space-y-4">
              {LANDER_NAVS.map((nav) => (
                <li key={nav.link}>
                  <Link
                    className="flex items-center gap-3 text-sm font-medium"
                    href={nav.link}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {nav.icon &&
                      (typeof nav.icon === "function"
                        ? React.createElement(nav.icon)
                        : nav.icon)}
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center justify-around mt-10 border-t border-white/10 pt-6">
              <li>
                <Link href="/search" onClick={() => setDrawerOpen(false)}>
                  <MegnifyIcon />
                </Link>
              </li>
              <li>
                <Link href="/cart" onClick={() => setDrawerOpen(false)}>
                  <ShoppingIcon />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" onClick={() => setDrawerOpen(false)}>
                  <UserIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default LanderNavbar1;
