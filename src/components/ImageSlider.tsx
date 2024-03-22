"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ImageSliderProps {
  urls: string[];
}
const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });
  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);
  const activeStyle =
    "active:scale-[.97] grid hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300 opacity-100";
  const inactiveStyle = "hidden text-gray-400";
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button
          className={cn(activeStyle, "right-3 transition", {
            [inactiveStyle]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
        >
          <ChevronRightIcon
            aria-label="next image"
            onClick={(e) => {
              e.preventDefault();
              swiper?.slideNext();
            }}
            className="h-4 w-4 text-zinc-700"
          />
        </button>
        <button
          className={cn(activeStyle, "left-3 transition", {
            [inactiveStyle]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
        >
          <ChevronLeftIcon
            aria-label="previous image"
            onClick={(e) => {
              e.preventDefault();
              swiper?.slidePrev();
            }}
            className="h-4 w-4 text-zinc-700"
          />
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="transition rounded-full ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide className="-z-10 relative h-full w-full" key={i}>
            <Image
              fill
              loading="lazy"
              className="h-full w-full -z-10 object-center object-cover"
              src={url}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
