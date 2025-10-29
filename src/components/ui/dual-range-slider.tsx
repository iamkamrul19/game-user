"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  label?: (value: number) => React.ReactNode;
  onClear: () => void;
}

export const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    { className, value, onValueChange, min, max, step = 1, label, onClear },
    ref
  ) => {
    const handleChange = (newValue: number[]) => {
      let [newMin, newMax] = newValue;

      // ✅ Clamp correctly: don't let them cross
      if (newMin >= value[1]) {
        newMin = value[1]; // stop at current max
      }
      if (newMax <= value[0]) {
        newMax = value[0]; // stop at current min
      }

      onValueChange([newMin, newMax]);
    };

    return (
      <div className="w-full">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={handleChange}
        >
          <SliderPrimitive.Track className="relative h-[5px] w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range className="absolute h-full bg-[#ADEE68]" />
          </SliderPrimitive.Track>
          {value.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              className="block h-[19px] w-[19px] rounded-full bg-[#ADEE68] hover:scale-110 transition"
            />
          ))}
        </SliderPrimitive.Root>

        {/* Labels */}
        <div className="mt-5 flex justify-between  text-[14px] leading-[14px] font-poppins font-semibold text-white/80">
          {label ? (
            <div className="flex items-center justify-between w-full">
              <span className="block">{label(value[0])}</span>
              <button
                onClick={onClear}
                type="button"
                className="underline cursor-pointer"
              >
                Clear
              </button>
              <span className="block">{label(value[1])}</span>
            </div>
          ) : (
            <>
              <span>{value[0]}</span>
              <span>{value[1]}</span>
            </>
          )}
        </div>
      </div>
    );
  }
);

DualRangeSlider.displayName = "DualRangeSlider";
