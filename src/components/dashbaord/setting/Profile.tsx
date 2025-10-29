"use client";
import React, { useEffect } from "react";
import SettingTitle from "./SettingTitle";
import Avatar from "@/components/common/Avatar";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import z from "zod";
import { profileSchema } from "./setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "./FormGroup";
import Button from "@/components/ui/Button";
import { useImageUploadMutation } from "@/redux/api/imageApi";
import { useUpdatePersonalInfoMutation } from "@/redux/api/dashboardApi";
import toast from "react-hot-toast";
import { showMultiple } from "@/utils/notification";

const Profile = () => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [imageUpload, { isLoading: uLoading }] = useImageUploadMutation();
  const [updateInfo, { isLoading }] = useUpdatePersonalInfoMutation();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: undefined,
      phone_number: undefined,
      profile_picture: undefined,
      nickname: undefined,
      country: undefined,
      birth_date: undefined,
      social_links: {
        facebook: undefined,
        twitter: undefined,
        instagram: undefined,
        linkedin: undefined,
      },
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        form.setValue("profile_picture", reader.result as string);
      };
      reader.readAsDataURL(file);
      try {
        // console.log(file);
        const formData = new FormData();
        formData.append("files", file as File);
        const res = await imageUpload(formData).unwrap();
        if (res?.statusCode === 200) {
          setImageUrl(res.data?.[0] || "");
          form.setValue("profile_picture", res.data?.[0] || "");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const res = await updateInfo({ data: values }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message || "Profile updated successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        showMultiple("error", error?.data?.errorMessages || []);
      } else {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (user) {
      setImageUrl(user.profile_picture || null);
      form.setValue("profile_picture", user.profile_picture || "");
      form.setValue("full_name", user.full_name || "");
      //   form.setValue("nickname", user.nickname || "");
      form.setValue("phone_number", user.phone_number || "");
      if (user?.birth_date && !isNaN(new Date(user.birth_date).getTime())) {
        form.setValue(
          "birth_date",
          new Date(user.birth_date).toISOString().split("T")[0]
        );
      }
      form.setValue("social_links", {
        facebook: user.social_links?.facebook || "",
        twitter: user.social_links?.twitter || "",
        instagram: user.social_links?.instagram || "",
        linkedin: user.social_links?.linkedin || "",
      });
    }
  }, [user, form]);
  const loading = isLoading || uLoading;
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} method="post">
        <SettingTitle title="Profile" />
        <div className="mt-7 flex items-center gap-4">
          <Avatar imageUrl={imageUrl || ""} />
          <label
            htmlFor="file"
            className="bg-[#373737] rounded-[50px] px-[14px] py-2"
          >
            <p className="text-[12px] leading-[18px] font-semibold font-inter text-white/80 cursor-pointer">
              Upload
            </p>
            <input
              disabled={loading}
              onChange={handleUpload}
              type="file"
              id="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-6">
            <FormGroup
              label="Full Name"
              error={form.formState.errors.full_name?.message}
            >
              <input
                {...form.register("full_name")}
                type="text"
                placeholder="Enter your full name"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
            <FormGroup
              label="Nickname"
              error={form.formState.errors.nickname?.message}
            >
              <input
                {...form.register("nickname")}
                type="text"
                placeholder="Enter your nickname"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <FormGroup
              label="Phone Number"
              error={form.formState.errors.phone_number?.message}
            >
              <input
                {...form.register("phone_number")}
                type="text"
                placeholder="Enter your phone number"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
            <FormGroup
              label="Birth Date"
              error={form.formState.errors.birth_date?.message}
            >
              <input
                {...form.register("birth_date")}
                type="date"
                placeholder="Enter your birth date"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <FormGroup
              label="Country"
              error={form.formState.errors.country?.message}
            >
              <input
                {...form.register("country")}
                type="text"
                placeholder="Enter your country"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
          </div>
        </div>

        <div className="mt-8">
          <SettingTitle title="Social Links" />
          <div className="mt-5 flex flex-col lg:flex-row gap-6">
            <FormGroup
              label="Facebook"
              error={form.formState.errors.social_links?.facebook?.message}
            >
              <input
                {...form.register("social_links.facebook")}
                type="text"
                placeholder="Enter your facebook link"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
            <FormGroup
              label="Twitter"
              error={form.formState.errors.social_links?.twitter?.message}
            >
              <input
                {...form.register("social_links.twitter")}
                type="text"
                placeholder="Enter your twitter link"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
          </div>
          <div className="mt-5 flex flex-col lg:flex-row gap-6">
            <FormGroup
              label="Instagram"
              error={form.formState.errors.social_links?.instagram?.message}
            >
              <input
                {...form.register("social_links.instagram")}
                type="text"
                placeholder="Enter your instagram link"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
            <FormGroup
              label="LinkedIn"
              error={form.formState.errors.social_links?.linkedin?.message}
            >
              <input
                {...form.register("social_links.linkedin")}
                type="text"
                placeholder="Enter your linkedin link"
                className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
            </FormGroup>
          </div>
        </div>

        <div className="mt-6">
          <Button
            disabled={loading}
            isLoading={loading}
            parentClassName="min-w-[150px]"
            type="submit"
            variant="auth"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
