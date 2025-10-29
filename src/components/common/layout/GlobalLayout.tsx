"use client";

import { setIPAddress } from "@/redux/slice/globalSlice";
import { getIPAddress } from "@/service/ip.service";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  children: ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getIP() {
      const ip = await getIPAddress();
      if (ip.ip) {
        dispatch(setIPAddress(ip.ip || null));
      }
    }
    getIP();
  }, [dispatch]);

  return children;
};

export default GlobalLayout;
