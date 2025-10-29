"use client";

import { useAppSelector } from "@/redux/hooks";
import SettingTitle from "./SettingTitle";
import { useForm } from "react-hook-form";
import z from "zod";
import { changeEmailSchema, changePasswordSchema } from "./setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/Button";
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
} from "@/redux/api/dashboardApi";
import toast from "react-hot-toast";
import { showMultiple } from "@/utils/notification";

const Email = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [passwordMutation, { isLoading: pLoading }] =
    useChangePasswordMutation();
  const [emailMutation, { isLoading }] = useChangeEmailMutation();
  const passForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: undefined,
      confirm_password: undefined,
      new_password: undefined,
    },
  });

  const emailForm = useForm<z.infer<typeof changeEmailSchema>>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      current_email: undefined,
      confirm_new_email: undefined,
      new_email: undefined,
    },
  });
  async function onEmailSubmit(values: z.infer<typeof changeEmailSchema>) {
    try {
      const res = await emailMutation({ data: values }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message || "");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        showMultiple("error", error?.data?.errorMessage || []);
        return;
      }
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }

  async function onPassSubmit(values: z.infer<typeof changePasswordSchema>) {
    try {
      const res = await passwordMutation({ data: values }).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message || "");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        showMultiple("error", error?.data?.errorMessage || []);
        return;
      }
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }
  const loading = isLoading || pLoading;
  return (
    <div>
      <div>
        <SettingTitle title="Account security" />
        <p className="text-[11px] leading-7 text-[#B8B8B8] font-inter font-medium">
          {user?.email || ""}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        {/* email  */}

        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="flex-1 flex flex-col gap-[22px]"
        >
          <SettingTitle title="Change your Email" />
          <div>
            <input
              {...emailForm.register("current_email")}
              type="email"
              placeholder="your current email"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {emailForm.formState.errors.current_email?.message && (
              <ErrorMessage
                msg={emailForm.formState.errors.current_email?.message}
              />
            )}
          </div>
          <div>
            <input
              {...emailForm.register("new_email")}
              type="email"
              placeholder="New email"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {emailForm.formState.errors.new_email?.message && (
              <ErrorMessage
                msg={emailForm.formState.errors.new_email?.message}
              />
            )}
          </div>
          <div>
            <input
              {...emailForm.register("confirm_new_email")}
              type="email"
              placeholder="Confirm email"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {emailForm.formState.errors.confirm_new_email?.message && (
              <ErrorMessage
                msg={emailForm.formState.errors.confirm_new_email?.message}
              />
            )}
          </div>
          <div className="">
            <Button
              disabled={loading}
              isLoading={loading}
              variant="yellow"
              parentClassName="rounded-[50px] max-w-[160px]"
              className="bg-[#232323] rounded-[50px]"
            >
              <p>Save changes</p>
            </Button>
          </div>
        </form>
        {/* password  */}
        <form
          onSubmit={passForm.handleSubmit(onPassSubmit)}
          className="flex-1 flex flex-col gap-[22px]"
        >
          <SettingTitle title="Change your password" />
          <div>
            <input
              {...passForm.register("current_password")}
              type="password"
              placeholder="your current password"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {passForm.formState.errors.current_password?.message && (
              <ErrorMessage
                msg={passForm.formState.errors.current_password?.message}
              />
            )}
          </div>
          <div>
            <input
              {...passForm.register("new_password")}
              type="password"
              placeholder="Password"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {passForm.formState.errors.new_password?.message && (
              <ErrorMessage
                msg={passForm.formState.errors.new_password?.message}
              />
            )}
          </div>
          <div>
            <input
              {...passForm.register("confirm_password")}
              type="password"
              placeholder="Confirm password"
              className="bg-[#222222] mt-2 py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />
            {passForm.formState.errors.confirm_password?.message && (
              <ErrorMessage
                msg={passForm.formState.errors.confirm_password?.message}
              />
            )}
          </div>
          <div className="">
            <Button
              disabled={loading}
              isLoading={loading}
              variant="yellow"
              parentClassName="rounded-[50px] max-w-[160px]"
              className="bg-[#232323] rounded-[50px]"
            >
              <p>Save changes</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
