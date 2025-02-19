"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
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

  const getInitialCategory = () => {
    const pathCategory = pathname.split("/").pop();
    return pathCategory && pathCategory !== "all" ? pathCategory : null;
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    getInitialCategory()
  );

  const handleCategoryChange = (category: string | null) => {
    if (!gender) return;

    setSelectedCategory(category);
    const path = category
      ? `/${gender}/${category.toLowerCase()}`
      : `/${gender}/all`;
    router.push(path, { scroll: false });
  };
  const titleLabel =
    selectedCategory === null
      ? "Products"
      : selectedCategory === "sports"
      ? "Sportswear"
      : selectedCategory;

  return (
    <div className="flex text-white font-bold flex-col mb-10">
      <div className="text-gray-800 text-2xl md:text-4xl md:mb-6 mx-auto pb-6">
        {gender && `${gender[0].toUpperCase() + gender.slice(1)}'s `}
        {titleLabel[0].toUpperCase() + titleLabel.slice(1)}
      </div>
      <div className="bg-zinc-700 sm:p-5 md:p-7 p-3">
        <div className="block md:flex items-center md:pl-20">
          <h1 className="text-lg md:text-xl mb-2 md:mb-0 md:mr-3 text-gray-200">
            Explore more:
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-x-3">
            <button
              onClick={() => handleCategoryChange(null)}
              className={classNames(
                "hover:underline md:text-xl cursor-pointer bg-transparent text-white  transition-all duration-200 border-2 border-solid",
                {
                  "border-white rounded-lg py-0.5 px-1":
                    selectedCategory === null,
                  "border-transparent": selectedCategory !== null,
                }
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={classNames(
                  "hover:underline md:text-xl cursor-pointer bg-transparent text-white  transition-all duration-200 border-2 border-solid",
                  {
                    "border-white rounded-lg py-0.5 px-1":
                      selectedCategory === category.name,
                    "border-transparent": selectedCategory !== category.name,
                  }
                )}
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
