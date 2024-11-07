import React from "react";
import Link from "next/link";

type SaleCategoryBannerProps = {
  discount: string;
  categories: { name: string; link: string }[];
};

const SaleCategoryBanner: React.FC<SaleCategoryBannerProps> = ({
  discount,
  categories,
}) => {
  return (
    <div className="flex text-white font-bold  flex-col mb-10">
      <div className="bg-zinc-400 pt-10 pl-20 flex flex-col gap-y-3 w-full h-44">
        <h1 className="text-2xl">{discount}% OF YOUR FIRST BUY</h1>
        <p className="text-xl">Shop all the essentials you still need</p>
      </div>
      <div className="flex pl-20  text-xl gap-x-5 bg-zinc-700 p-7">
        <h1 className="mr-5">Explore more:</h1>
        {categories.map((category) => {
          return (
            <Link
              className="hover:underline cursor-pointer"
              href={`/category/${category.link}`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SaleCategoryBanner;
