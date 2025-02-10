"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Category } from "@/config/types/product";

type SaleCategoryBannerProps = {
  discount: string;
  categories: Category[];
};

const SaleCategoryBanner: React.FC<SaleCategoryBannerProps> = ({
  discount,
  categories,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const gender = pathname.includes("/men/")
    ? "men"
    : pathname.includes("/women/")
    ? "women"
    : null;

  const handleCategoryChange = (category: string | null) => {
    if (!gender) return;

    const path = category
      ? `/${gender}/${category.toLowerCase()}`
      : `/${gender}/all`;
    router.push(path, {
      scroll: false,
    });
  };

  return (
    <div className="flex text-white font-bold flex-col mb-10">
      <div className="bg-zinc-700 p-5 md:p-7">
        <div className="block md:flex items-center md:pl-20">
          <h1 className="text-lg md:text-xl mb-2 md:mb-0 md:mr-3 text-gray-200">
            Explore more:
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-x-3">
            <button
              onClick={() => handleCategoryChange(null)}
              className="hover:underline md:text-xl  cursor-pointer bg-transparent border-none text-white"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className="hover:underline  md:text-xl cursor-pointer bg-transparent border-none text-white"
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-400 py-6 px-4 md:pt-10 md:pl-20 flex flex-col gap-y-2 md:gap-y-3 w-full h-auto md:h-44 text-center md:text-left">
        <h1 className="text-lg md:text-2xl">{discount}% OFF YOUR FIRST BUY</h1>
        <p className="text-base md:text-xl">
          Shop all the essentials you still need
        </p>
      </div>
    </div>
  );
};

export default SaleCategoryBanner;
