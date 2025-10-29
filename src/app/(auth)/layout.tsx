import AuthLayout from "@/components/common/layout/AuthLayout";
import Footer from "@/components/common/layout/footer";
import LanderNavbar from "@/components/common/layout/navbar/LanderNavbar2";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Auth = ({ children }: Props) => {
  return (
    <div className="bg-[#161616]">
      <LanderNavbar />
      <AuthLayout>{children}</AuthLayout>
      <Footer />
    </div>
  );
};

export default Auth;
