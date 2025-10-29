"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import {
  useResendEmailOtpMutation,
  useVerifyEmailMutation,
} from "@/redux/api/authApi";
import { seIsAuthenticated, setAuthUser } from "@/redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { verifyEmailSchema } from "./verifyEmail.schema";
import Button from "@/components/ui/Button";
import useMediaQuery from "@/hooks/useMediaQuery";

const OTP_TIME = 10 * 60;
const VerifyEmail = () => {
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [timeLeft, setTimeLeft] = useState<number>(OTP_TIME);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [verifyMutation, { isLoading }] = useVerifyEmailMutation();
  const [resendMutation, { isLoading: resendLoading }] =
    useResendEmailOtpMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const otp = watch("otp");

  const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
    try {
      const res = await verifyMutation({
        email: values.email,
        otp: values.otp,
      }).unwrap();
      const { statusCode, data, message } = res;
      if (statusCode === 200) {
        toast.success(message || "");
        if (data?.action === "CHANGE_PASSWORD") {
          router.replace(`/change-password?email=${values.email}`);
        } else {
          dispatch(setAuthUser(data?.user || null));
          dispatch(seIsAuthenticated(data?.user ? true : false));
          Cookies.set("token", data?.token, { expires: 1 });
          router.replace("/");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Email verification failed");
    }
  };

  const handleOtpChange = (otp: string) => {
    setValue("otp", otp, { shouldValidate: true });
  };

  const handleResend = async () => {
    try {
      const emailParam = searchParams.get("email");
      if (!emailParam) {
        toast.error("Email is missing");
        return;
      }
      const res = await resendMutation({ email: emailParam }).unwrap();
      const { statusCode, message } = res;
      if (statusCode === 200) {
        toast.success(message || "");
        setTimeLeft(OTP_TIME);
        setTimerActive(true);
      } else {
        toast.success(message || "");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Email verification failed");
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    // Get email and otp from search params if they exist
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");
    if (!emailParam) {
      router.replace("/login");
    }

    if (emailParam) {
      setValue("email", emailParam);
      setTimerActive(true);
    }
    if (otpParam) {
      setValue("otp", otpParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  return (
    <div className="py-10 flex flex-col lg:flex-row lg:justify-center lg:items-center gap-12 px-6">
      <div className="w-[320px] h-[320px] rounded-[24px] overflow-hidden">
        <Image
          className="w-full h-full object-center object-cover"
          src="/verify-email.jpg"
          height={300}
          width={300}
          alt="image"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="text-white mb-[30px]">
          <h1 className="text-[24px] font-inter font-bold">
            Verify your email
          </h1>
          <p className="text-white/40 mt-2">
            Your code was sent to you via email{" "}
            {timerActive ? (
              <span className="text-[#8552FE]">({formatTime(timeLeft)})</span>
            ) : (
              <button
                disabled={isLoading || resendLoading}
                onClick={handleResend}
                type="button"
                className="text-[#8552FE] cursor-pointer"
              >
                Resend
              </button>
            )}
          </p>
        </div>

        <input type="hidden" {...register("email")} />

        <div className="flex flex-col gap-2">
          <OtpInput
            inputType="text"
            containerStyle={{ width: "280px" }}
            value={"" + otp}
            onChange={handleOtpChange}
            numInputs={6}
            renderSeparator={<span className="!text-white px-1">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  color: "#929292 !important",
                  maxWidth: isLg ? "54px" : "44px",
                }}
                className="bg-[#232323] text-white py-2 lg:py-[14px] px-2 lg:px-[20px] border border-white/20 rounded-[6px] text-center placeholder:text-[#929292]"
              />
            )}
          />
          {errors.otp && <ErrorMessage msg={errors.otp.message} />}
        </div>

        <Button variant="auth" isLoading={isLoading || resendLoading}>
          Verify Email
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmail;
