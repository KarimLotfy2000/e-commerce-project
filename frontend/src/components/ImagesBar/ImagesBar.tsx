"use client";
import * as React from "react";
import { useCarousel } from "@/components/ui/carousel";
import ImageComponent from "../ui/image";

type ImagesBarProps = {
  images: string[];
};

export const ImagesBar: React.FC<ImagesBarProps> = ({ images }) => {
  const { scrollTo } = useCarousel();

  return (
    <div className="flex flex-row xl:flex-col align-center items-center space-x-2 md:space-y-2 mt-4">
      {(images && images.length > 0 ? images : ["/images/placeholder.svg"]).map(
        (image, index) => (
          <button
            key={index}
            className="w-16 h-16 sm:h-auto overflow-hidden border border-gray-300 rounded-md"
            onMouseEnter={() => scrollTo && scrollTo(index)}
          >
            <ImageComponent
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </button>
        )
      )}
    </div>
  );
};
