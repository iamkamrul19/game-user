import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseReportSchema } from "./reports.schema";
import { Label } from "../ui/label";
import ErrorMessage from "../common/ErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "../ui/ImageUpload";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PurchaseFailedReport = ({ open, setOpen }: Props) => {
  const form = useForm<z.infer<typeof purchaseReportSchema>>({
    resolver: zodResolver(purchaseReportSchema),
    defaultValues: {
      problem_type: undefined,
      refund_in: undefined,
      attachments: [],
      message: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof purchaseReportSchema>) {
    console.log(values);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-white-gradient">
              Report an Issue
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="mt-6"
          >
            <div className="space-y-[24px] max-h-[450px] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-3 flex-1">
                  <Label className="text-[12px] leading-5 font-semibold font-inter text-white">
                    Problem Type
                  </Label>
                  <Controller
                    control={form.control}
                    name="problem_type"
                    render={({ field }) => (
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessage
                    msg={form?.formState?.errors?.problem_type?.message}
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <Label className="text-[12px] leading-5 font-semibold font-inter text-white">
                    Refund In
                  </Label>
                  <Controller
                    control={form.control}
                    name="problem_type"
                    render={({ field }) => (
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessage
                    msg={form?.formState?.errors?.problem_type?.message}
                  />
                </div>
              </div>

              {/* instructions  */}
              <div>
                <h1 className="text-white-gradient text-[18px] leading-7 font-inter font-bold">
                  Instructions
                </h1>
                <p className="text-[13px] leading-[13px] text-white/90 font-bold mt-5">
                  Some specific screenshots are crucial for the seller to
                  properly investigate the case.
                </p>
                <p className="text-[13px] leading-[13px] text-white/90 font-bold mt-3">
                  Remember to attach the following ones:
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li className="text-[13px] leading-[13px] text-white/90 list-disc ml-5">
                    Entered key before activation
                  </li>
                  <li className="text-[13px] leading-[13px] text-white/90 list-disc ml-5">
                    Error message
                  </li>
                  <li className="text-[13px] leading-[13px] text-white/90 list-disc ml-5">
                    Game Library
                  </li>
                </ul>
                <p className="text-[13px] leading-[13px] text-white/90 mt-5">
                  2. Want the merchant to resolve the issue as soon as possible?
                  Make sure that all your screenshots are unedited and your
                  taskbar with time/date is visible.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <Label className="text-[12px] leading-5 font-semibold font-inter text-white">
                  Message to the merchant
                </Label>
                <Controller
                  control={form.control}
                  name="attachments"
                  render={({ field }) => (
                    <ImageUpload
                      name={field.name}
                      onChange={() => {}}
                      value={field.value[0]}
                      placeholder="You can submit a maximum of 6 attachments, each no larger than 15MB"
                    />
                  )}
                />
                <ErrorMessage
                  msg={form?.formState?.errors?.problem_type?.message}
                />
              </div>
              <div className="flex flex-col gap-3 flex-1 mb-3">
                <Label className="text-[12px] leading-5 font-semibold font-inter text-white">
                  Message to the merchant
                </Label>
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <textarea
                      className="bg-[#161616] border-[1px] border-[#F9F9F999] rounded-[12px] text-[#DEDEDE] p-3"
                      placeholder="Enter the message"
                    ></textarea>
                  )}
                />
                <ErrorMessage
                  msg={form?.formState?.errors?.problem_type?.message}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-3">
              <div className="bg-gradient-to-r from-[#F8C431] to-[#FF6400] p-[1px] rounded-[50px]">
                <div className="bg-[#161616] rounded-[50px]">
                  <button
                    type="submit"
                    className="text-gradient text-[16px] leading-7 font-black font-inter py-3 px-8 cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchaseFailedReport;
