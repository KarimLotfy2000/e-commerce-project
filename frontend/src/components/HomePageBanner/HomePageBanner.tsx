import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePageBanner() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[calc(100vh-80px)]">
      <Image
        src="/images/banner.jpg"
        alt="Banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      <div className="relative z-10 text-center">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-400 to-gray-200 bg-clip-text text-transparent">
            Welcome to FashionFusion
          </h1>
          <p className="text-xl mb-8 bg-gradient-to-r from-white via-gray-400 to-gray-200 bg-clip-text text-transparent">
            Discover the latest trends in fashion.
          </p>
        </div>
      </div>
    </div>
  );
}
