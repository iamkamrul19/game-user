"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { loginSchema } from "./login.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import toast from "react-hot-toast";
import { seIsAuthenticated, setAuthUser } from "@/redux/slice/authSlice";
import Cookies from "js-cookie";
import { useLoginMutation } from "@/redux/api/authApi";
import { showMultiple } from "@/utils/notification";

const SOCIALS = [
  {
    name: "Facebook",
    provider: "facebook",
    icon: <FaFacebookF className="text-[#ACACAC]" />,
  },
  {
    name: "Google",
    provider: "google",
    icon: <FaGoogle className="text-[#ACACAC]" />,
  },
  {
    name: "Discord",
    provider: "discord",
    icon: <FaDiscord className="text-[#ACACAC]" />,
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await loginMutation({
        email: values.email,
        password: values.password,
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
        showMultiple("error", error?.data?.errorMessages || []);
        return;
      }
      toast.error(error?.data?.message || "Login failed");
    }
  }

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
        className="max-w-[400px] w-full"
      >
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <h1 className="text-[24px] font-inter font-bold text-white">
              Log in Your account
            </h1>
            <p className="text-[#898989] font-medium font-inter leading-[21px]">
              {`Don't have an account?`}{" "}
              <Link className="text-[#ADEE68]" href={"/register"}>
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {SOCIALS?.map((social) => (
              <button
                type="button"
                className="cursor-pointer size-[44px] rounded-full bg-white/10 flex justify-center items-center"
                key={social.provider}
              >
                {social?.icon}
              </button>
            ))}
          </div>
          <div>
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
          <div>
            <input
              {...form.register("password")}
              type="password"
              placeholder="Password"
              className="bg-[#232323] py-[14px] px-[24px] border border-white/20 rounded-[50px] text-[#929292] placeholder:text-[#929292] outline-none w-full"
            />{" "}
            {form.formState.errors.password && (
              <ErrorMessage msg={form.formState.errors.password.message} />
            )}
          </div>
          <Button isLoading={isLoading} variant="auth" type="submit">
            Login
          </Button>

          <div>
            <Link
              href={"/forget-password"}
              className="mt-7 lg:mt-10 text-[#898989] font-inter font-medium leading-[21px]"
            >
              Forget password?
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
