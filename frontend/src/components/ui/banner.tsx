import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BannerProps {
  imageSrc: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  bannerObjectPosition?: "top" | "center" | "bottom";
}

const Banner: React.FC<BannerProps> = ({
  imageSrc,
  text,
  buttonText,
  buttonLink,
  bannerObjectPosition,
}) => {
  return (
    <div className="relative w-full h-80 sm:h-96">
      <Image
        src={imageSrc}
        alt={text}
        layout="fill"
        objectFit="cover"
        className="z-0 min-h-[300px] sm:min-h-[450px]"
        style={{ objectPosition: bannerObjectPosition }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div></div>
        <div className="flex justify-between items-end">
          <h2 className="text-white text-lg sm:text-3xl font-bold">{text}</h2>
          <Button className="px-2 sm:px-4 text-xs sm:text-sm" variant="primary">
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
