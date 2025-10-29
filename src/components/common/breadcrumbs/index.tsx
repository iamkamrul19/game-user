import ChevronIcon from "@/components/icons/ChevronIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import Link from "next/link";

interface Props {
  links: string[];
}

const BreadCrumbs = ({ links }: Props) => {
  return (
    <div className="flex items-center gap-2 text-[14px] leading-[28px] font-medium font-inter text-white opacity-80">
      <Link href={"/"}>
        <HomeIcon />
      </Link>
      <ChevronIcon className="size-[12px]" />
      {links?.map((item, index) => {
        const isNotLast = index + 1 < links?.length;
        return (
          <div
            className="flex items-center gap-2"
            key={`${item + Math.random()}`}
          >
            <p className="capitalize">{item}</p>
            {isNotLast && <ChevronIcon className="size-[12px]" />}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
