"use client";

import BreadCrumbs from "@/components/common/breadcrumbs";
import { useLazyGetSingleGameByIdQuery } from "@/redux/api/gameApi";
import { setGlobalLoading } from "@/redux/slice/globalSlice";
import {
  ICheckoutGame,
  ICustomGame,
  IGame,
  IRequirement,
  ISelectedGame,
} from "@/types";
import { useParams, useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import PreviewCard from "./PreviewCard";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import StarIcon from "@/components/icons/StarIcon";
import InAppIcon from "@/components/icons/InAppIcon";
import InAppCard from "./InAppCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SystemCard from "./SystemCard";
import AnotherCard from "./AnotherCard";
import PriceSection from "@/components/common/PriceSection";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import { OPTION_TYPE, PLATFORM } from "@/enum";
import PCIcon from "@/components/icons/PCIcon";
import XboxIcon from "@/components/icons/XboxIcon";
import PSIcon from "@/components/icons/PSIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import CrossCircleIcon from "@/components/icons/CrossCircleIcon";
import Button from "@/components/ui/Button";
import BluetoothIcon from "@/components/icons/BluetoothIcon";
import EditionCard from "./EditionCard";
import Similars from "./Similars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldControl from "./FieldControl";
import "./game-details.css";
import Reviews from "@/components/common/reviews/Reviews";
import { useDispatch } from "react-redux";
import { setCheckoutGame } from "@/redux/slice/checkoutSlice";
import z from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { addToCartSchema } from "./gameDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const GameDetails = () => {
  const dispatch = useDispatch();
  const [game, setGame] = useState<IGame | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<ISelectedGame | undefined>(
    undefined
  );
  const [preview, setPreview] = useState<{
    url: string;
    type: "image" | "video";
  }>({ url: "", type: "image" });
  const router = useRouter();
  const { id: gameId } = useParams();
  const [gameDetail] = useLazyGetSingleGameByIdQuery();
  const form = useForm<z.infer<typeof addToCartSchema>>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      fields: [],
    },
  });

  const { fields: fieldsArray, append } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const getPlatformIcon = (value: string) => {
    switch (value) {
      case PLATFORM.PC:
        return <PCIcon fillOpacity={1} />;
      case PLATFORM.XBOX:
        return <XboxIcon fillOpacity={1} />;
      case PLATFORM.PS:
        return <PSIcon fillOpacity={1} />;
      default:
        break;
    }
  };

  useEffect(() => {
    async function getGame() {
      try {
        if (gameId) {
          setGlobalLoading(true);
          const data = await gameDetail({ gameId: gameId as string }).unwrap();
          if (data?.data) {
            const {
              id,
              need_user_info,
              price,
              offer_price,
              platform,
              stock,
              title,
              images,
            } = data?.data;
            setGame(data?.data);
            setSelectedGame({
              is_required: need_user_info?.is_required || false,
              game_id: id,
              customer_notes: need_user_info?.customer_notes || "",
              offer_price: offer_price || 0,
              price: price || 0,
              platform: platform || "",
              stock: stock || 0,
              title: title,
              image_url: images[0] || "",
            });
            setPreview({
              url: data?.data?.images?.[1] as string,
              type: "image",
            });
            if (need_user_info?.is_required) {
              need_user_info.fields?.forEach((item) =>
                append({
                  type: item.type,
                  value: "",
                  title: item.title,
                  content: item.content,
                  options: item.options,
                })
              );
            }
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
    getGame();
  }, [gameId]);

  const handlePreView = (url: string, type: "image" | "video") => {
    setPreview({ url: url, type });
  };

  const handleOther = (item: ICustomGame) => {
    if (item?.game_id === selectedGame?.game_id) {
      setSelectedGame({
        is_required: true,
        customer_notes: game?.need_user_info?.customer_notes || "",
        game_id: game?.id || "",
        offer_price: game?.offer_price || 0,
        price: game?.price || 0,
        platform: game?.platform || "",
        stock: game?.stock || 0,
        title: game?.title || "",
        image_url: game?.images[0] || "",
      });
      return;
    }
    setSelectedGame({
      is_required: true,
      customer_notes: selectedGame?.customer_notes || "",
      game_id: item?.game_id,
      offer_price: item?.offer_price,
      platform: game?.platform || "",
      price: item?.price,
      stock: selectedGame?.stock || 0,
      title: item?.title,
      image_url: game?.images[0] || "",
    });
  };

  const handleAddToCart = (type: string) => {
    const game = {
      id: selectedGame?.game_id || "",
      title: selectedGame?.title || "",
      platform: selectedGame?.platform || "",
      image_url: selectedGame?.image_url || "",
      price: selectedGame?.price || 0,
      offer_price: selectedGame?.offer_price || 0,
      from_offer: false,
      quantity: 1,
    } as ICheckoutGame;
    dispatch(
      setCheckoutGame({
        action: "add",
        data: game,
      })
    );
    if (type === "buyNow") {
      router.push("/checkout/payment");
    }
  };

  const onSubmit = (payload: z.infer<typeof addToCartSchema>, type: string) => {
    try {
      const game = {
        id: selectedGame?.game_id || "",
        title: selectedGame?.title || "",
        platform: selectedGame?.platform || "",
        image_url: selectedGame?.image_url || "",
        price: selectedGame?.price || 0,
        offer_price: selectedGame?.offer_price || 0,
        from_offer: false,
        quantity: 1,
        fields: payload?.fields?.length
          ? payload?.fields?.map((item) => ({
              title: item?.title,
              field: item?.type,
              value: item?.value || "",
            }))
          : [],
      } as ICheckoutGame;
      dispatch(
        setCheckoutGame({
          data: game,
          action: "add",
        })
      );
      if (type === "buyNow") {
        router.push("/checkout/payment");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const imageList = game?.images || [];
  const videoList = game?.videos || [];
  const inStock = game && game?.stock > 0 ? true : false;
  return (
    <>
      <section
        className="h-auto lg:h-[470px] bg-cover bg-center bg-no-repeat pb-10 lg:pb-0 lg:mb-[100px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.17) 100%), url('${game?.images?.[0]}')`,
        }}
      >
        <div className="main-container pt-[100px]">
          <BreadCrumbs links={[game?.title as string]} />
          <div className="mt-7 flex lg:items-start flex-col lg:flex-row lg:justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="h-[250px] w-full lg:h-[377px] lg:w-[668px] rounded-[16px] border-[1px] border-white/20 overflow-hidden relative">
                {preview?.type === "video" ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    className="object-cover"
                    src={preview?.url}
                  />
                ) : preview?.url ? (
                  <Image
                    className="w-full h-full object-cover object-center"
                    src={preview?.url as string}
                    height={377}
                    width={668}
                    alt="preview"
                  />
                ) : null}
              </div>
              <div className="flex items-center gap-3 max-w-[668px] overflow-x-auto custom-scrollbar">
                {imageList?.map((item, index) => (
                  <PreviewCard
                    type="image"
                    url={item}
                    key={`${item}-${index}`}
                    onClick={handlePreView}
                    isSelected={item === preview?.url}
                  />
                ))}
                {videoList?.map((item, index) => (
                  <PreviewCard
                    type="video"
                    url={item}
                    key={`${item}-${index}`}
                    onClick={handlePreView}
                    isSelected={item === preview?.url}
                    thumbnail={imageList[index < imageList?.length ? index : 0]}
                  />
                ))}
              </div>
            </div>
            {selectedGame?.is_required ? (
              <form method="post">
                <div className="border-[1px] border-[#ADEE68] px-6 pt-5 pb-[30px] rounded-[20px] bg-black/50 flex flex-col gap-5 lg:min-h-[370px] lg:min-w-[425px]">
                  <div className="flex items-center gap-3 bg-[#29D252] rounded-[50px] py-1 px-[9px] w-fit">
                    {getPlatformIcon(selectedGame?.platform || "")}
                    <p className="text-black text-[14px] leading-[21px] font-inter font-semibold">
                      {selectedGame?.platform}
                    </p>
                  </div>
                  <h1 className="text-[22px] leading-[22px] font-semibold font-poppins text-white line-clamp-2">
                    {selectedGame?.title || ""}
                  </h1>
                  <div className="flex items-center gap-2 px-[11px] py-[14px] text-[10px] leading-[10px] font-inter bg-[#29297B] rounded-[8px]">
                    <p className="font-bold text-[#ADEE68]">Selected</p>
                    <p className="font-medium text-white">
                      {selectedGame?.title || ""}
                    </p>
                  </div>
                  {/* form  */}
                  <div className="flex flex-col gap-3">
                    {fieldsArray?.map((item, idx) => {
                      return (
                        <FieldControl
                          className={`${
                            item.type === OPTION_TYPE.RADIO && "min-h-[42px]"
                          } ${
                            [OPTION_TYPE.DROPDOWN, OPTION_TYPE.RADIO].includes(
                              item.type as OPTION_TYPE
                            ) && "!py-[2px] !pl-0"
                          }`}
                          key={item.id}
                          label={item?.title || ""}
                          content={item?.content || undefined}
                          error={
                            form.formState.errors.fields?.[idx]?.value?.message
                          }
                        >
                          {[OPTION_TYPE.TEXT, OPTION_TYPE.EMAIL].includes(
                            item?.type as OPTION_TYPE
                          ) && (
                            <Controller
                              control={form.control}
                              name={`fields.${idx}.value`}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  {...form.register(`fields.${idx}.value`)}
                                  onChange={field.onChange}
                                  className="w-full h-full outline-none"
                                  placeholder={`${
                                    item?.type === OPTION_TYPE?.EMAIL
                                      ? "Enter email"
                                      : "Enter text"
                                  }`}
                                />
                              )}
                            />
                          )}
                          {[OPTION_TYPE.DROPDOWN, OPTION_TYPE.RADIO].includes(
                            item.type as OPTION_TYPE
                          ) && (
                            <Controller
                              key={`${item.id}-${idx}-${Math.random()}`}
                              control={form.control}
                              name={`fields.${idx}.value`}
                              render={({ field }) => (
                                <Select
                                  key={`${item}-${idx}-${Math.random() * 232}`}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value || ""}
                                >
                                  <SelectTrigger className="w-[calc(100%-50px)] border-none [&_svg]:hidden">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {item?.options?.map((opt, index) => (
                                      <SelectItem
                                        key={`${opt}-${index}-${
                                          Math.random() * 22321
                                        }`}
                                        value={opt}
                                      >
                                        {opt}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          )}
                        </FieldControl>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    <PriceSection
                      price={selectedGame?.price as number}
                      offerPrice={selectedGame?.offer_price as number}
                    />
                    <button
                      type="button"
                      className="size-[37px] border-[1px] border-white/20 rounded-[7px] backdrop-blur-[10px] flex justify-center items-center cursor-pointer"
                    >
                      <BookmarkIcon className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-[13px] leading-[21px] text-white/80 text-center">
                      {selectedGame?.customer_notes || ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      onClick={form.handleSubmit((data) =>
                        onSubmit(data, "addToCart")
                      )}
                      type="submit"
                      variant="outline"
                      className="bg-black !py-[12px] "
                      parentClassName="spin-bg"
                    >
                      <span className="flex-1 bg-gradient-to-r from-[#F8C431] to-[#FF6400] bg-clip-text text-transparent">
                        Add to cart
                      </span>
                    </Button>
                    <Button
                      onClick={form.handleSubmit((data) =>
                        onSubmit(data, "buyNow")
                      )}
                      type="submit"
                      variant="outline"
                      className="w-full !text-black"
                    >
                      Buy now
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="border-[1px] border-white/20 px-6 pt-5 pb-[30px] rounded-[20px] bg-black/50 flex flex-col gap-5">
                  <div className="flex items-center gap-3 bg-[#29D252] rounded-[50px] py-1 px-[9px] w-fit">
                    {getPlatformIcon(game?.platform || "")}
                    <p className="text-black text-[14px] leading-[21px] font-inter font-semibold">
                      {game?.platform}
                    </p>
                  </div>
                  <h1 className="text-[22px] leading-[22px] font-semibold font-poppins text-white">
                    {game?.title || ""}
                  </h1>
                  <div className="bg-white/10 border-[1px] border-white/20 rounded-[8px] w-fit flex items-center text-white text-[12px] leading-[12px] font-medium py-2 font-inter px-[11px] gap-2">
                    <p className="min-w-[100px] border-r-[1px] border-r-white/20 flex items-center gap-2">
                      {inStock ? (
                        <CheckIcon className="text-[#32CA5B]" />
                      ) : (
                        <CrossCircleIcon className="text-red-500" />
                      )}
                      {inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <p className="flex items-center gap-2">
                      <DownloadIcon className="text-[#32CA5B]" />
                      Digital download
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="bg-[#29297B] rounded-[8px] py-[14px] px-[11px] flex-1 text-[11px] leading-[11px] text-white font-inter font-medium capitalize">
                      {game?.source || ""}
                    </p>
                    <p className="bg-[#29297B] rounded-[8px] py-[14px] px-[11px] flex-1 text-[11px] leading-[11px] text-white font-inter font-medium capitalize">
                      {game?.edition || ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <PriceSection
                      price={game?.price as number}
                      offerPrice={game?.offer_price as number}
                    />
                    <button
                      type="button"
                      className="size-[37px] border-[1px] border-white/20 rounded-[7px] backdrop-blur-[10px] flex justify-center items-center cursor-pointer"
                    >
                      <BookmarkIcon className="text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      onClick={() => handleAddToCart("addToCart")}
                      type="button"
                      variant="outline"
                      className="bg-black"
                    >
                      <span className="flex-1 bg-gradient-to-r from-[#F8C431] to-[#FF6400] bg-clip-text text-transparent">
                        Add to cart
                      </span>
                    </Button>
                    <Button
                      onClick={() => handleAddToCart("buyNow")}
                      type="button"
                      variant="yellow"
                      className="w-full !text-black"
                    >
                      Buy now
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-center bg-white/10 rounded-[8px] py-[5px] px-4 text-white/80 text-[12px] leading-3 font-inter w-fit">
                      Save{" "}
                      <span className="font-bold text-[#29D252]">Tk 120</span>{" "}
                      taka with GGsubscriptions Plus
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-center rounded-[8px] py-[5px] px-4 text-white/80 text-[12px] leading-3 font-inter w-fit">
                    Earn <span className="font-bold text-white">Tk 120</span> on
                    this product
                  </p>
                  <Button
                    variant="outline"
                    type="button"
                    className="bg-[#161616]"
                    parentClassName="!w-fit"
                  >
                    <BluetoothIcon className="size-[16px]" />
                    <span>Affiliation</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {game?.custom_games?.length ? (
        <section className="main-container pt-[60px] lg:pt-[420px] mb-12">
          <SectionTitle title="Select another option" showIcon={false} />
          <div className="mt-7 flex flex-col lg:flex-row lg:items-center gap-[18px]">
            {game?.custom_games?.map((item, idx) => (
              <AnotherCard
                item={item}
                key={item.game_id + idx}
                isSelected={selectedGame?.game_id === item?.game_id}
                onClick={handleOther}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section
        className={`main-container flex lg:items-center flex-col lg:flex-row gap-12 ${
          !game?.custom_games?.length && "pt-[64px] lg:pt-[120px]"
        }`}
      >
        <div>
          <SectionTitle title="About" showIcon={false} />
          <div className="max-h-[400px] max-w-[633px] overflow-y-scroll custom-scrollbar mt-5">
            <p className="text-white max-h-[409px]">{game?.description}</p>
          </div>
        </div>
        <div>
          <div className="bg-[#1E1E1E] rounded-[10px] py-10 px-9 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-2">
              <p className="min-w-[140px] text-white font-inter font-semibold text-[14px] leading-[20px]">
                User Rating
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 45]?.map((item) => (
                    <StarIcon key={item} className="text-[#FBB24A]" />
                  ))}
                </div>
                <p className="text-[14px] leading-5 font-semibold text-white font-inter">
                  5.00 (2533)
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-2">
              <p className="min-w-[140px] text-white font-inter font-semibold text-[14px] leading-[20px]">
                Developer:
              </p>
              <p className="text-[13px] leading-5 font-inter text-white/80 max-w-[220px]">
                {game?.developer}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-2">
              <p className="min-w-[140px] text-white font-inter font-semibold text-[14px] leading-[20px]">
                Publisher:
              </p>
              <p className="text-[13px] leading-5 font-inter text-white/80 max-w-[220px]">
                {game?.publisher}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-2">
              <p className="min-w-[140px] text-white font-inter font-semibold text-[14px] leading-[20px]">
                Release date:
              </p>
              <p className="text-[13px] leading-5 font-inter text-white/80 max-w-[220px]">
                {new Date(game?.release_date as string)?.toDateString()}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-2">
              <p className="min-w-[140px] text-white font-inter font-semibold text-[14px] leading-[20px]">
                Genre:
              </p>
              <p className="text-[13px] leading-5 font-inter text-white/80 max-w-[220px]">
                {game?.genre || ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-7 lg:mt-9">
            <p className="min-w-[80px] text-white font-inter font-semibold text-[14px] leading-[20px]">
              User tags:
            </p>
            <div className="flex items-center gap-1 max-w-[360px] overflow-x-auto custom-scrollbar">
              {game?.tags?.map((item) => (
                <p
                  className="text-white/80 text-[13px] leading-5 font-inter bg-[#393939] py-1 px-3 rounded-[16px] text-nowrap"
                  key={item}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="main-container mt-12">
        <SectionTitle title="Game features" showIcon={false} />
        <div className="mt-6 w-fit bg-white/10 border-[1px] border-white/20 rounded-[8px] flex items-center gap-2 px-[9px] py-2 text-white font-inter text-[12px] leading-3 font-medium">
          <InAppIcon />
          <span>In-App Purchase</span>
        </div>
        <div className="mt-7 flex flex-col lg:flex-row lg:items-center gap-3">
          {game?.features?.values?.map((item) => (
            <InAppCard key={item} value={item} />
          ))}
        </div>
      </section>

      {/* editions  */}
      <section className="main-container section">
        <SectionTitle title="Editions" showIcon={false} />
        <div className="flex flex-col gap-5 mt-5">
          {game?.others_edition?.games?.map((item) => (
            <EditionCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* system  */}
      <section className="main-container my-[60px] lg:my-[80px]">
        <Tabs defaultValue="windows" className="">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <SectionTitle title="System Requirements" showIcon={false} />
            <TabsList className="bg-transparent flex items-center gap-2">
              <TabsTrigger
                value="windows"
                className="bg-[#232632] text-white text-[13px] leading-5 font-semibold font-inter rounded-[16px] transition-colors duration-200 data-[state=active]:bg-[#004617]"
              >
                Windows
              </TabsTrigger>
              <TabsTrigger
                value="mac"
                className="bg-[#232632] text-white text-[13px] leading-5 font-semibold font-inter rounded-[16px] transition-colors duration-200 data-[state=active]:bg-[#004617]"
              >
                Mac
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="windows"
            className="flex flex-col lg:flex-row lg:items-center gap-10 mt-7 lg:mt-9"
          >
            <SystemCard
              title="Minimum"
              requirement={
                game?.system_requirements?.[0]
                  ?.minimum_system_requirements as IRequirement
              }
            />
            <SystemCard
              title="Recommended"
              requirement={
                game?.system_requirements?.[0]
                  ?.recommended_system_requirements as IRequirement
              }
            />
          </TabsContent>
          <TabsContent
            value="mac"
            className="flex flex-col lg:flex-row lg:items-center gap-10 mt-7 lg:mt-9"
          >
            <SystemCard
              title="Minimum"
              requirement={
                game?.system_requirements?.[1]
                  ?.minimum_system_requirements as IRequirement
              }
            />
            <SystemCard
              title="Recommended"
              requirement={
                game?.system_requirements?.[1]
                  ?.recommended_system_requirements as IRequirement
              }
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* reviews  */}
      <Reviews
        total_reviews={game?.rating_section?.total_reviews || 0}
        average_rating={game?.rating_section?.average_rating || 0}
        reviews={game?.rating_section?.reviews || []}
        showAddButton={true}
        game_id={game?.id as string}
      />
      <Similars games={game?.similar_games?.games || []} />
    </>
  );
};

export default GameDetails;
