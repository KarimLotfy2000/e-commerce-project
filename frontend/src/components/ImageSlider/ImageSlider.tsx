// ImageSlider.tsx
import * as React from "react";
import classNames from "classnames";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

type ImageSliderProps = {
  withButtons?: boolean;
  className?: string;
  images: string[];
  setApi?: (api: CarouselApi | null) => void;
};

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  className = "",
  setApi,
  withButtons,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className={classNames(className)}
        setApi={setApi}
      >
        <CarouselContent className="flex">
          {images.map((image, index) => (
            <CarouselItem key={index} className={classNames(className)}>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={330}
                height={500}
                className="object-cover w-full h-full rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {withButtons && <CarouselPrevious />}
        {withButtons && <CarouselNext />}
      </Carousel>
    </div>
  );
};
