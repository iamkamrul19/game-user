"use client";

import BreadCrumbs from "@/components/common/breadcrumbs";
import { useLazyGetSingleCollectionQuery } from "@/redux/api/collectionApi";
import { setGlobalLoading } from "@/redux/slice/globalSlice";
import { ICollection, IGame } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import NoData from "@/components/common/NoData";
import Reviews from "@/components/common/reviews/Reviews";
import GameCardSkeleton from "./GameCardSkeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CollectionDetails = () => {
  const router = useRouter();
  const { id: collectionId } = useParams();
  const [gameList, setGameList] = useState<IGame[]>([]);
  const [filterList, setFilterList] = useState<IGame[]>([]);
  const [collection, setCollection] = useState<ICollection | undefined>(
    undefined
  );
  const [collectionDetails, { isLoading, isFetching }] =
    useLazyGetSingleCollectionQuery();

  const handleFilter = (value: string) => {
    if (value === "all") {
      setFilterList([...gameList]);
    } else if (value === "low_to_high") {
      const ascending = [...gameList].sort((a, b) => a.price - b.price);
      setFilterList(ascending);
    } else if (value === "high_to_low") {
      const descending = [...gameList].sort((a, b) => b.price - a.price);
      setFilterList(descending);
    } else {
      setFilterList([...filterList]);
    }
  };

  useEffect(() => {
    async function getCollection() {
      try {
        if (collectionId) {
          setGlobalLoading(true);
          const data = await collectionDetails({
            id: collectionId as string,
          }).unwrap();
          if (data?.data) {
            setCollection(data?.data || {});
            setGameList(data?.data?.games || []);
            setFilterList(data?.data?.games || []);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        router.replace("/not-found");
        console.log(error);
      } finally {
        setGlobalLoading(false);
      }
    }
    getCollection();
  }, [collectionId]);
  return (
    <>
      <section
        className="h-auto lg:h-[650px] bg-cover bg-center bg-no-repeat mb-[70px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.17) 100%), url('/collection-bg.png')`,
        }}
      >
        <div className="main-container pt-[100px]">
          <BreadCrumbs links={["collections", collection?.title || ""]} />
          <div className="mt-10 bg-[#23232380] border-[1px] border-white/20 rounded-[16px] overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center bg-[#232323E5] px-8 lg:px-10 py-4 lg:py-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {isLoading || isFetching ? (
                  <div className="w-[250px] h-[24px] bg-[#2a2a2a] rounded-[6px] animate-pulse"></div>
                ) : (
                  <h1 className="text-white text-[20px] leading-[30px] font-poppins font-semibold max-w-[490px]">
                    {collection?.title || ""}
                  </h1>
                )}
              </div>
              <div className="flex items-center gap-3">
                <p className="bg-white/10 px-3 py-2.5 rounded-[10px] text-[14px] leading-[14px] font-inter text-[#FFBC00] flex items-center gap-2">
                  <span className="text-white font-medium ">Results item:</span>{" "}
                  <span>{collection?.game_ids?.length || 0}</span>
                </p>
                <Select onValueChange={handleFilter}>
                  <SelectTrigger className="text-white w-[100px] lg:w-[130px] border-[1px] border-white/30">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="low_to_high">Low to High</SelectItem>
                    <SelectItem value="high_to_low">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="backdrop-blur-[30px] max-h-[500px] overflow-y-auto custom-scrollbar">
              {isLoading || isFetching ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full w-full">
                  <GameCardSkeleton />
                  <GameCardSkeleton />
                  <GameCardSkeleton />
                  <GameCardSkeleton />
                </div>
              ) : filterList?.length > 0 ? (
                <div className="p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full w-full">
                  {filterList?.map((item) => (
                    <GameCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="main-container section">
        <h2 className="text-[23px] leading-[23px] font-poppins font-bold text-white max-w-[630px]">
          {collection?.title || ""}
        </h2>
      </section>
      <section className="main-container text-white">
        <p
          dangerouslySetInnerHTML={{ __html: collection?.description || "" }}
        ></p>
      </section>
      <Reviews
        average_rating={collection?.rating_section?.average_rating || 0}
        reviews={collection?.rating_section?.reviews || []}
        total_reviews={collection?.rating_section?.total_reviews || 0}
        showAddButton={false}
        game_id={collection?.game_id as string}
      />
    </>
  );
};

export default CollectionDetails;
