/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const useCountdownTimer = (
  startDate: Date | string | number,
  endDate: Date | string | number
): Countdown => {
  const formatTime = (time: number): string => time.toString().padStart(2, "0");

  const calculateTimeLeft = (): Countdown => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // If dates are invalid or end before start, return zero
    if (isNaN(start) || isNaN(end) || end <= start || Date.now() < start) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const total = end - Date.now();
    if (total <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      days: formatTime(days),
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
    };
  };

  const [timeLeft, setTimeLeft] = useState<Countdown>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return timeLeft;
};
