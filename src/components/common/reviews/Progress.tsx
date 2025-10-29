import React, { useEffect, useState } from "react";

interface CircularProgressBarProps {
  value: number; // between 0 and 100
  size?: number; // px size of the circle
  strokeWidth?: number; // stroke thickness
  color?: string; // stroke color
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#74EBD5", // Tailwind's blue-500
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 10) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(90deg) scale(-1, 1)", // Rotate start point to bottom & reverse direction
        }}
      >
        {/* Background circle */}
        <circle
          stroke="#e5e7eb" // Tailwind's gray-200
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          //   strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.5s ease-out",
          }}
        />
      </svg>

      {/* Percentage text in the middle */}
      <span
        className="absolute text-[16px] leading-[23px] font-inter font-bold"
        style={{
          color: color,
        }}
      >
        {progress}
      </span>
    </div>
  );
};

export default CircularProgressBar;
