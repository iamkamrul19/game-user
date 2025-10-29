"use client";

import { useAppSelector } from "@/redux/hooks";
import { CURRENCIES, LANGUAGES } from "./setting.data";
import SettingTitle from "./SettingTitle";
import { useUpdateLangAndCurrInfoMutation } from "@/redux/api/dashboardApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slice/authSlice";
import { showMultiple } from "@/utils/notification";

const Language = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [updateMutation, { isLoading }] = useUpdateLangAndCurrInfoMutation();

  const handleChange = async (key: string, value: string) => {
    try {
      const res = await updateMutation({ data: { key, value } }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message || "");
        if (user) {
          dispatch(
            setAuthUser({
              ...user,
              [key]: value,
            })
          );
        }
      } else {
        toast.error("Something went wrong");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        showMultiple("error", error?.data?.errorMessage || []);
        return;
      }
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="flex flex-col gap-7">
      <SettingTitle title="Language and currency" />
      <div className="">
        <SettingTitle title="Language" className="!text-[12px]" />
        <div className="mt-[14px] bg-[#232323] rounded-[20px] px-[16px] py-[18px] flex flex-col lg:flex-row gap-3">
          {LANGUAGES.map((item) => (
            <button
              disabled={isLoading}
              onClick={() => handleChange("language", item.name)}
              key={item.id}
              className={`bg-[#161616] flex items-center gap-3 text-[13px] font-inter font-semibold leading-7 text-white min-w-[250px] min-h-[46px] py-[9px] px-[17px] rounded-[14px] cursor-pointer capitalize ${
                user?.language === item?.name && "border-[1px] border-[#ADEE68]"
              }`}
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <SettingTitle title="Currencies" className="!text-[12px]" />
        <div className="mt-[14px] bg-[#232323] rounded-[20px] px-[16px] py-[18px] flex flex-col lg:flex-row gap-3">
          {CURRENCIES.map((item) => (
            <button
              disabled={isLoading}
              onClick={() => handleChange("currency", item.name)}
              key={item.id}
              className={`bg-[#161616] flex items-center gap-3 text-[13px] font-inter font-semibold leading-7 text-white min-w-[250px] min-h-[46px] py-[9px] px-[17px] rounded-[14px] cursor-pointer ${
                user?.currency === item?.name && "border-[1px] border-[#ADEE68]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Language;
