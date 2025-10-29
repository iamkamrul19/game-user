/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useImageUploadMutation } from "@/redux/api/imageApi";
import { ChangeEvent, forwardRef } from "react"; // Import forwardRef
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface Props {
  // We'll use forwardRef, so 'ref' is handled differently.
  // The 'name' prop is crucial for React Hook Form.
  name: string;
  value: string | undefined; // Make it potentially undefined
  // For RHF, instead of a direct setImage, you'll get field.onChange
  // which will update the form state.
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
  // If you need to expose a ref for the outer div, use a separate prop like 'containerRef'.
  // For now, we'll focus on the input ref.
}

// Use forwardRef to correctly pass the ref to the internal input element
const ImageUpload = forwardRef<HTMLInputElement, Props>(
  ({ name, value, onChange, placeholder, className }, ref) => {
    const [imageUpload, { isLoading }] = useImageUploadMutation();

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.[0];
        if (!file) {
          // If no file is selected (e.g., user cancels), clear the image in the form
          onChange(undefined);
          return;
        }

        const formData = new FormData();
        formData.append("files", file);

        const res = await imageUpload(formData).unwrap();
        // console.log(res);

        if (res.data && res.data[0]) {
          const imageUrl = res.data[0];
          onChange(imageUrl); // <--- Crucial: Call RHF's onChange
        } else {
          toast.error("Image upload failed: No data received.");
          onChange(undefined); // Clear value if upload failed
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "An error occurred during upload.");
        onChange(undefined); // Clear value on error
      }
    };

    return (
      <div
        className={twMerge(
          "w-full border-[1px] border-[#F9F9F999] rounded-[8px] border-dashed flex justify-center items-center bg-cover bg-center px-[30px] py-[48px]",
          className
        )}
        style={{
          backgroundImage: value ? `url(${value})` : "none",
          backgroundColor: value ? "transparent" : "#1A1A1A",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {placeholder && (
            <span className="text-[10px] leading-[15px] text-[#DEDEDE]">
              {placeholder}
            </span>
          )}
          <label
            className="bg-[#3A3A3A] py-[6px] px-[18px] border-[1px] border-[#F5F6FA24] shadow-[0px_12px_20px_0px_rgba(0,0,0,0.1)] font-semibold text-[10px] leading-[15px] text-white rounded-[8px] cursor-pointer"
            htmlFor={`banner-input-${name}`} // Use name to create unique ID
          >
            {isLoading ? "Uploading..." : "Upload file"}
            <input
              name={name}
              disabled={isLoading}
              ref={ref} // <--- Apply the forwarded ref here
              id={`banner-input-${name}`} // Use name to create unique ID
              onChange={handleUpload} // Internal handler for upload logic
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload"; // Add display name for better debugging

export default ImageUpload;
