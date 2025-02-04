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
      ? `/${gender}/products/${category.toLowerCase()}`
      : `/${gender}/products`;
    router.push(path, {
      scroll: false,
    });
  };

  return (
    <div className="flex text-white font-bold flex-col mb-10">
      <div className="flex pl-20 text-xl gap-x-3 bg-zinc-700 p-7">
        <h1 className="mr-5">Explore more:</h1>
        <button
          onClick={() => handleCategoryChange(null)}
          className="hover:underline cursor-pointer bg-transparent border-none mr-3 text-white"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.name)}
            className="hover:underline cursor-pointer bg-transparent border-none text-white"
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-zinc-400 pt-10 pl-20 flex flex-col gap-y-3 w-full h-44">
        <h1 className="text-2xl">{discount}% OFF YOUR FIRST BUY</h1>
        <p className="text-xl">Shop all the essentials you still need</p>
      </div>
    </div>
  );
};

export default SaleCategoryBanner;
