import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/ui/Button";
import { useGetGameCategoriesQuery } from "@/redux/api/gameApi";
import Link from "next/link";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const { data } = useGetGameCategoriesQuery();
  const categories = data?.data ? data?.data?.slice(0, 6) : [];
  return (
    <section className="section">
      <div className="main-container">
        <div className="flex items-center justify-between">
          <SectionTitle title="Categories" showIcon={true} />
          <Link href={"/"}>
            <Button variant="outline" className="bg-[#2D2D2D]">View all</Button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-7">
          {categories?.map((item) => (
            <CategoryCard category={item} key={item?.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
