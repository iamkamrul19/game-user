import NotFoundIcon from "@/components/icons/NotFoundIcon";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#161616] p-6">
      <h2 className="text-center lg:text-start bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent text-[24px] leading-7 font-inter font-bold">
        Looks like you have found the blue pacman villain!
      </h2>
      <p className="text-center lg:text-start text-[12px] leading-[18px] text-[#898989] font-inter font-medium mt-3.5">
        The page you are looking for does not exist or have been removed from
        our website.
      </p>
      <NotFoundIcon className="mt-8" />
      <Link
        href="/"
        className="mt-10 bg-[#404040] py-2.5 px-6 rounded-[50px] text-white text-[14px] leading-[20px] font-semibold font-inter"
      >
        Return to home
      </Link>
    </div>
  );
}
