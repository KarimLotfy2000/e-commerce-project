"use client";
import React, { useState, useCallback } from "react";
import { ImagesBar } from "@/components/ImagesBar/ImagesBar";
import { ImageSlider } from "@/components/ImageSlider/ImageSlider";
import { CarouselContext, CarouselApi } from "@/components/ui/carousel";
import { EmblaViewportRefType } from "embla-carousel-react";

type SliderWithImagesBarProps = {
  images: string[];
};

export const SliderWithImagesBar: React.FC<SliderWithImagesBarProps> = ({
  images,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselRef, _] = useState<EmblaViewportRefType>(() => null);
  const scrollTo = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: carouselApi,
        scrollTo,
      }}
    >
      <div className="flex md:ml-10 xl:flex-row flex-col xl:w-2/3 md:w-1/2 gap-x-5 2xl:size-1/2 items-center mb-10 justify-center">
        <ImageSlider
          withButtons={false}
          images={images}
          setApi={setCarouselApi}
        />
        <ImagesBar images={images} />
      </div>
    </CarouselContext.Provider>
  );
};
