"use client";

import { useState } from "react";
import { SETTING_TABS } from "./setting.data";
import Profile from "./Profile";
import Communication from "./Communication";
import Language from "./Language";
import Email from "./Email";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "cummunication":
        return <Communication />;
      // case "privacy":
      //   return <div className="text-white">Privacy Content</div>;
      case "language":
        return <Language />;
      case "email":
        return <Email />;
      default:
        return <div className="text-white">Select a tab to see content</div>;
    }
  };
  return (
    <div className="mt-12 flex flex-col lg:flex-row gap-6">
      <div className="flex-1 bg-[#222222] p-6 rounded-[10px]">
        <ul className="flex flex-col gap-6">
          {SETTING_TABS.map((tab) => (
            <li key={tab.id} className="">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 cursor-pointer`}
              >
                <span
                  className={`size-[30px] min-w-[30px] min-h-[30px] rounded-full  flex justify-center items-center ${
                    activeTab === tab.id
                      ? "text-black bg-[#FBB24A]"
                      : "text-white bg-[#161616]"
                  }`}
                >
                  {tab.icon}
                </span>
                <p className="flex flex-col text-left lg:text-nowrap">
                  <span
                    className={`text-[13px] leading-7 font-inter font-semibold ${
                      activeTab === tab.id ? "text-[#FBB24A]" : "text-white"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="text-[#B8B8B8] text-[11px] leading-7 font-medium font-inter -mt-1.5">
                    {tab.subtitle}
                  </span>
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-5 p-6">{renderContent()}</div>
    </div>
  );
};

export default Setting;
