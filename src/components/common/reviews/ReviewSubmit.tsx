"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { reviewSchema } from "./review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from "../Avatar";
import ErrorMessage from "../ErrorMessage";
import toast from "react-hot-toast";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  game_id: string;
}

const ReviewSubmit = ({ open, setOpen, game_id }: Props) => {
  const [createMutation, { isLoading }] = useCreateReviewMutation();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      game_id: undefined,
      rating: undefined,
      comment: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    try {
      if (!values?.game_id) {
        toast.error("Game ID is missing");
        return;
      }
      const res = await createMutation({ payload: values }).unwrap();
      if (res?.data) {
        toast.success(res?.message || "");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "");
    }
  }

  useEffect(() => {
    if (game_id) {
      form.setValue("game_id", game_id);
    }
  }, [game_id]);

  const rating = form.watch("rating");
  return (
    <>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)} modal>
        <DialogContent className="min-w-[50%]">
          <form onSubmit={form.handleSubmit(onSubmit)} method="post">
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <Avatar imageUrl={""} />
                    <div className="max-w-[370px]">
                      <h4 className="text-[21px] leading-[28px] font-bold font-inter bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
                        Write your review
                      </h4>
                      <p className="text-[12px] leading-[18px] text-white/60 font-inter mt-2">
                        In order to guide other users, you can write your own
                        opinion about this game, and say what you liked and
                        disliked.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={form.register("rating").name}
                        className={`flex items-center gap-2 text-[16px] leading-[24px] text-white/60 py-3 px-4 cursor-pointer rounded-[13px] ${
                          rating === "5" ? "bg-[#20B77B]/20" : "bg-[#161616]"
                        }`}
                      >
                        <input
                          value={"5"}
                          type="radio"
                          {...form.register("rating", { valueAsNumber: true })}
                          className=""
                        />
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.86921 8.25012L7.86926 1.5C8.46601 1.5 9.03832 1.73706 9.46028 2.15902C9.88224 2.58099 10.1193 3.15329 10.1193 3.75004V6.75009H14.3644C14.5818 6.74763 14.7972 6.79247 14.9956 6.88151C15.194 6.97055 15.3706 7.10165 15.5133 7.26574C15.656 7.42983 15.7613 7.62298 15.8219 7.8318C15.8825 8.04063 15.897 8.26014 15.8644 8.47512L14.8294 15.2252C14.7751 15.5829 14.5935 15.909 14.3178 16.1433C14.0422 16.3776 13.6911 16.5044 13.3294 16.5003H4.86921M4.86921 8.25012V16.5003M4.86921 8.25012H2.61917C2.22134 8.25012 1.8398 8.40816 1.55849 8.68947C1.27718 8.97078 1.11914 9.35232 1.11914 9.75015V15.0002C1.11914 15.3981 1.27718 15.7796 1.55849 16.0609C1.8398 16.3422 2.22134 16.5003 2.61917 16.5003H4.86921"
                            stroke="#20B77B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Good
                      </label>
                      <label
                        className={`flex items-center gap-2 text-[16px] leading-[24px] text-white/60 py-3 px-4 cursor-pointer rounded-[13px] ${
                          rating === "0" ? "bg-[#FF4778]/20" : "bg-[#161616]"
                        }`}
                        htmlFor={form.register("rating").name}
                      >
                        <input
                          value={"0"}
                          type="radio"
                          {...form.register("rating", { valueAsNumber: true })}
                          className=""
                        />
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1312 9.75032L9.13117 16.5004C8.53443 16.5004 7.96213 16.2633 7.54017 15.8413C7.11822 15.4194 6.88116 14.8471 6.88116 14.2503V11.2503H2.63614C2.4187 11.2528 2.20334 11.208 2.00495 11.1189C1.80657 11.0299 1.62992 10.8988 1.48723 10.7347C1.34455 10.5706 1.23925 10.3775 1.17862 10.1686C1.118 9.95981 1.1035 9.7403 1.13613 9.52532L2.17113 2.77528C2.22538 2.4176 2.40706 2.09157 2.68271 1.85727C2.95835 1.62297 3.30939 1.49618 3.67114 1.50027H12.1312M12.1312 9.75032V1.50027M12.1312 9.75032H14.1337C14.5582 9.75783 14.9706 9.60922 15.2928 9.3327C15.6149 9.05619 15.8243 8.67102 15.8812 8.25031V3.00028C15.8243 2.57957 15.6149 2.1944 15.2928 1.91789C14.9706 1.64137 14.5582 1.49276 14.1337 1.50027H12.1312"
                            stroke="#FF4778"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Bad
                      </label>
                    </div>
                    {form.formState.errors?.rating?.message && (
                      <ErrorMessage
                        msg={form.formState.errors?.rating?.message}
                      />
                    )}
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription className="mt-4">
                <textarea
                  {...form.register("comment")}
                  rows={4}
                  className="w-full bg-[#161616] py-5 px-7 rounded-[12px] outline-none"
                  placeholder="Enter the comment"
                ></textarea>
                {form.formState.errors?.comment?.message && (
                  <ErrorMessage
                    msg={form.formState?.errors?.comment?.message}
                  />
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                disabled={isLoading}
                className="bg-[#8552FE] w-full mt-5 py-2 flex justify-center items-center rounded-[50px] cursor-pointer text-white text-[14px] leading-[21px] font-inter font-semibold disabled:bg-[#8552FE]/80"
                type="submit"
              >
                Submit
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewSubmit;
