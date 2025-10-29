"use client";

import BreadCrumbs from "@/components/common/breadcrumbs";
import { useGetCollectionListQuery } from "@/redux/api/collectionApi";
import CollectionCard from "./CollectionCard";
import CustomSearch from "@/components/common/CustomSearch";
import { useState } from "react";
import NoData from "@/components/common/NoData";
import CollectionCardSkeleton from "./CollectionSkeleton";

const Collection = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching } = useGetCollectionListQuery(
    {
      search: search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const dataList = data?.data || [];
  // const bgImage = dataList?.[0]?.image_url || "";
  return (
    <>
      <section
        className="h-auto lg:h-[650px] bg-cover bg-center bg-no-repeat pb-10 lg:pb-0 lg:mb-[180px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.17) 100%), url('/collection-bg.png')`,
        }}
      >
        <div className="main-container pt-[100px]">
          <BreadCrumbs links={["collections"]} />

          <div className="mt-10 bg-[#23232380] border-[1px] border-white/20 rounded-[16px] overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-8 lg:px-10 py-4 lg:py-5 bg-[#232323E5]">
              <div className="">
                <h3 className="text-white text-[20px] leading-[30px] font-poppins font-semibold">
                  Collections
                </h3>
                <p className="text-[#C3C3C3] text-[12px] leading-[12px] font-inter mt-1">
                  Total {dataList?.length} Collection
                </p>
              </div>
              <CustomSearch
                className="lg:min-w-[250px]"
                placeholder="Search collection"
                onChange={(e) => setSearch(e.target.value?.trim())}
              />
            </div>
            <div className="backdrop-blur-[30px] border-b-[1px] border-b-white/20 rounded-b-[16px] mb-16 max-h-[500px] overflow-y-auto custom-scrollbar">
              {isLoading || isFetching ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full">
                  <CollectionCardSkeleton />
                  <CollectionCardSkeleton />
                  <CollectionCardSkeleton />
                </div>
              ) : dataList?.length > 0 ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full">
                  {dataList?.map((item) => (
                    <CollectionCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
