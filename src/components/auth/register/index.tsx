/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useGetCountryListListQuery } from "@/redux/api/countryApi";
import { useAppSelector } from "@/redux/hooks";
import { seIsAuthenticated, setAuthUser } from "@/redux/slice/authSlice";
import { showMultiple } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { registerSchema } from "./register.schema";
// import { getIPAddress } from "@/service/ip.service";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const { ip } = useAppSelector((state) => state.global);
  useGetCountryListListQuery(undefined);
  const { countryList } = useAppSelector((state) => state.settings);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      birth_date: "",
      phone_number: "",
      confirm_password: "",
      password: "",
      user_ip: "",
      country: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const res = await registerMutation({
        ...values,
        user_ip: values?.user_ip || "",
      }).unwrap();
      const { data, statusCode, message } = res;
      if (statusCode === 200) {
        toast.success(message || "");
        if (data?.action === "EMAIL_VERIFICATION") {
          router.replace(`/verify-email?email=${values.email}`);
        } else if (data?.action === "CHANGE_PASSWORD") {
          router.replace(`/change-password?email=${values.email}`);
        } else if (data?.action === "TWO_FACTOR_AUTH") {
          if (data?.data?.session) {
            router.replace(`/two-fa?token=${data?.data?.session}`);
          } else {
            toast.error("2fa session is missing");
          }
        } else if (data?.user && data?.token) {
          dispatch(setAuthUser(data?.user));
          dispatch(seIsAuthenticated(true));
          Cookies.set("token", data?.token, { expires: 1 });
          router.replace("/");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        console.log(error);
        showMultiple("error", error?.data?.errorMessages || []);
        return;
      }
      toast.error(error?.data?.message || "Login failed");
    }
  }

  useEffect(() => {
    form.setValue("user_ip", ip || "");
  }, [ip]);

  return (
    <section className="section flex flex-col lg:flex-row justify-center items-center gap-8 px-6">
      <div className="lg:min-w-[500px] lg:min-h-[500px] rounded-[24px] overflow-hidden">
        <Image
          className="w-full h-full object-center object-cover"
          src={"/login.png"}
          height={300}
          width={300}
          alt="image"
        />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="max-w-[550px] w-full"
      >
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <h1 className="text-[24px] font-inter font-bold text-white">
              Create a new account
            </h1>
            <p className="text-[#898989] font-medium font-inter leading-[21px]">
              {`Already have an account?`}{" "}
              <Link className="text-[#ADEE68]" href={"/login"}>
                Sign in
              </Link>
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-3">
            <div className="flex-1">
              <input
                {...form.register("full_name")}
                type="text"
                placeholder="Enter full name"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
              {form.formState.errors.full_name && (
                <ErrorMessage msg={form.formState.errors.full_name.message} />
              )}
            </div>
            <div className="flex-1">
              <input
                {...form.register("email")}
                type="email"
                placeholder="Email"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
              {form.formState.errors.email && (
                <ErrorMessage msg={form.formState.errors.email.message} />
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-3">
            <div className="flex-1 relative">
              <input
                {...form.register("birth_date")}
                type="date"
                placeholder="Enter birth date"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full appearance-none"
              />

              {form.formState.errors.full_name && (
                <ErrorMessage msg={form.formState.errors.full_name.message} />
              )}
            </div>
            <div className="flex-1">
              <input
                {...form.register("phone_number")}
                type="text"
                placeholder="Enter the phone number"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />
              {form.formState.errors.email && (
                <ErrorMessage
                  msg={form.formState.errors?.phone_number?.message}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-3">
            <div className="flex-1">
              <input
                {...form.register("password")}
                type="password"
                placeholder="Enter password"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />{" "}
              {form.formState.errors.password && (
                <ErrorMessage msg={form.formState.errors.password.message} />
              )}
            </div>
            <div className="flex-1">
              <input
                {...form.register("confirm_password")}
                type="password"
                placeholder="Enter confirm password"
                className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
              />{" "}
              {form.formState.errors.password && (
                <ErrorMessage msg={form.formState.errors.password.message} />
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-3">
              <Controller
                control={form.control}
                name="country"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="flex-1 w-full rounded-[50px] !py-6 !px-6 bg-[#161616] border-[1px] border-white/20 text-[#929292] cursor-pointer">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryList?.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {form.formState.errors.country && (
              <ErrorMessage msg={form.formState.errors?.country?.message} />
            )}
          </div>

          <Button isLoading={isLoading} variant="auth" type="submit">
            Create account
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Register;
