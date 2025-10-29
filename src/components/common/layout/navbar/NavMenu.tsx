import React from "react";
import { LANDER_NAVS } from "./navbar.data";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

const NavMenu = () => {
  return (
    <ul className="hidden md:flex items-center justify-center gap-5">
      {LANDER_NAVS.map((nav, index) => (
        <div key={index} className="flex items-center justify-center gap-5">
          {nav.type === "link" && (
            <li>
              <NavLink item={nav} />
            </li>
          )}
          {nav.type === "button" && (
            <li>
              <NavButton item={nav} />
            </li>
          )}
          {index === 2 && <span className="py-2 border border-white/20"></span>}
        </div>
      ))}
    </ul>
  );
};

export default NavMenu;
