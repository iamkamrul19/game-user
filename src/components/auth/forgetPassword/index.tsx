"use client";

import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { forgetPasswordSchema } from "./forget.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const router = useRouter();
  const [forgetMutation, { isLoading }] = useForgetPasswordMutation();

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    try {
      const res = await forgetMutation({
        email: values.email,
      }).unwrap();
      const { statusCode, message } = res;
      if (statusCode === 200) {
        toast.success(message);
        router.replace(`/verify-email/?email=${values?.email}`);
      } else {
        toast.error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }
  return (
    <section className="section flex flex-col lg:flex-row justify-center items-center gap-12 px-6">
      <div className="lg:min-w-[400px] lg:min-h-[400px] rounded-[24px] overflow-hidden flex justify-center items-center">
        <Image
          className="w-full h-full object-center object-cover"
          src={"/verify-email.jpg"}
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
        <div className="flex flex-col gap-6 w-full">
          <div className="">
            <h1 className="text-[24px] font-inter font-bold text-white">
              Lost your password?
            </h1>
            <p className="text-[#898989] text-[12px] font-medium font-inter leading-[18px] mt-3">
              Please enter the address which you used to register. We will send
              you an email with your new password. Check your spam box if you do
              not receive it. In case of any complications, please contact us at
              this address: support@instant-gaming.com contact us.
            </p>
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
          <Button
            isLoading={isLoading}
            variant="auth"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
