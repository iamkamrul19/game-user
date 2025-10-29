"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LANDER_NAVS } from "./navbar.data";
import MegnifyIcon from "@/components/icons/MegnifyIcon";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Menu, X } from "lucide-react";
import ButtonLink from "./ButtonLink";
import NavMenu from "./NavMenu";

const LanderNavbar2 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="bg-[#00000080] h-[72px] px-6 md:px-12 flex items-center text-white sticky top-0 z-50">
        <nav className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/gg-logo.svg" height={33} width={123} alt="gg-logo" />
          </Link>

          {/* Desktop Nav Links */}
          <NavMenu />

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ul className="hidden lg:flex items-center gap-3">
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px]">
                <ButtonLink icon={<MegnifyIcon />} link="/search" />
              </li>
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px]">
                <ButtonLink icon={<ShoppingIcon />} link="/cart" />
              </li>
              <li className="bg-[#FFFFFF1A] size-9 flex items-center justify-center rounded-[10px]">
                <ButtonLink icon={<UserIcon />} link="/dashboard" />
              </li>
            </ul>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden ml-2"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="w-64 h-full bg-[#1a1a1a] text-white p-6 relative flex flex-col justify-between">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            {/* Top: Navigation Links */}
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

            {/* Bottom: Icons */}
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

export default LanderNavbar2;
