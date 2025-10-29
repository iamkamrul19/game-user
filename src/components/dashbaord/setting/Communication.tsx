"use client";

import { useAppSelector } from "@/redux/hooks";
import SettingTitle from "./SettingTitle";
import { COMMUNICATIONS } from "./setting.data";
import { Switch } from "@/components/ui/switch";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slice/authSlice";
import { useUpdateCommunicationInfoMutation } from "@/redux/api/dashboardApi";
import toast from "react-hot-toast";
import { showMultiple } from "@/utils/notification";

const Communication = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [upateCommunication, { isLoading }] =
    useUpdateCommunicationInfoMutation();

  const handleSwitchChange = async (id: string, checked: boolean) => {
    try {
      if (!user) {
        // console.error("User or user._id is missing");
        toast.error("User not found. Please log in again.");
        return;
      }

      const res = await upateCommunication({
        data: { [id]: checked },
      }).unwrap();
      if (res.statusCode === 200 && res.success) {
        toast.success(res.message || "Updated successfully");
        dispatch(
          setAuthUser({
            ...user,
            _id: user._id,
            communications: {
              ...user.communications,
              [id]: checked,
            },
          })
        );
      } else {
        toast.error(res.message || "Failed to update");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        showMultiple("error", error?.data?.errorMessage || []);
        return;
      }
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div>
        <SettingTitle title="Communication Settings" />
        <p className="text-[11px] leading-7 text-[#B8B8B8] font-inter font-medium">
          {user?.email || ""}
        </p>
      </div>
      {COMMUNICATIONS.map((item, index) => (
        <div key={index} className="mt-7">
          <SettingTitle title={item.title || ""} className="text-[14px]" />
          <div className="mt-4 flex flex-col gap-4 bg-[#232323] py-[18px] px-[16px] rounded-[20px]">
            {item?.options.map((item) => (
              <label
                htmlFor={item.id}
                key={item.id}
                className="flex items-center gap-2"
              >
                <Switch
                  disabled={isLoading}
                  checked={
                    user?.communications?.[
                      item?.id as keyof typeof user.communications
                    ] === true
                      ? true
                      : false
                  }
                  onCheckedChange={handleSwitchChange.bind(null, item.id)}
                  className="data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#F8C431] data-[state=checked]:to-[#FF6400] data-[state=unchecked]:bg-[#232323] border-[0.5px] border-[#F8C431]"
                />
                <span className="text-[#B8B8B8] text-[11px] leading-6 lg:leading-7 font-medium font-inter">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Communication;
