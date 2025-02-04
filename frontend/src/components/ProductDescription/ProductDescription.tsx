import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductInfo } from "@/config/types/product";

export type ProductDescriptionProps = {
  product: ProductInfo;
  rating?: { count: number; rate: number };
  discount?: number;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  rating = { count: 127, rate: 4.5 },
  discount = 0,
}) => {
  const {
    name,
    brand,
    price,
    gender,
    description,
    material,
    categoryName,
    sizeVariants,
  } = product;

  const discountedPrice = price * (1 - discount / 100); // Normally, calculations should be done by the backend
  const originalPrice = price;

  const availableSizes = sizeVariants
    .filter(({ stock }) => stock > 0)
    .map(({ size }) => size);

  const categoryMap: { [key: number]: string } = {
    1: "Clothing",
    2: "Shoes",
    3: "Accessories",
    4: "Sports",
  };

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rate);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <div key={index} className="relative">
            <Star className="text-gray-300 h-5 w-5" />
            <Star className="absolute top-0 left-0 text-yellow-400 h-5 w-5" />
          </div>
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="text-gray-300 h-5 w-5" />
            <Star
              className="absolute top-0 left-0 text-yellow-400 h-5 w-5"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={index + fullStars + 1} className="text-gray-300 h-5 w-5" />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-6 bg-white">
      {" "}
      <p className="text-2xl text-gray-600">{brand}</p>
      <h1 className="text-4xl mt-2 font-bold">{name}</h1>
      <div className="mt-2">
        <span className="font-bold">Price:</span>
        <div className="flex items-baseline space-x-2">
          <span
            className={classNames("text-xl font-bold", {
              "text-red-600": discount > 0,
              "text-gray-600": discount === 0,
            })}
          >
            {discountedPrice.toFixed(2)} €
          </span>
          {discount > 0 && (
            <span className="text-xl text-gray-500 line-through">
              {originalPrice.toFixed(2)} €
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">VAT included</p>
        {discount > 0 && (
          <p className="text-sm text-gray-500">
            Originally: {originalPrice.toFixed(2)} € up to -{discount}%
          </p>
        )}
      </div>
      <p className="text-xl text-gray-600 mt-2">
        <span className="font-bold">Category:</span>{" "}
        {categoryName[0].toUpperCase() + categoryName.slice(1)}
      </p>
      <p className="text-xl text-gray-600 mt-2">
        <span className="font-bold">Material:</span> {material}
      </p>
      <p className="text-xl text-gray-600 my-2">
        <span className="font-bold">Gender:</span>{" "}
        {gender[0] + gender.slice(1).toLowerCase()}
      </p>
      {renderStars(rating.rate)}
      <div className="flex flex-col mt-2 space-y-2">
        <span className="text-sm text-gray-500">({rating.count} reviews)</span>
        <span className="text-2xl text-gray-600 inline">
          {description || "No description available."}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="text-xl font-semibold ml-2 align-middle"
              >
                <Info />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <span className="text-xl text-gray-500">
                    {description || "No additional information available."}
                  </span>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </span>
      </div>
      <div className="mt-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sizes</SelectLabel>
              {availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="No Sizes Available" disabled>
                  No Sizes Available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-x-1">
        <Button
          variant="accent"
          className="w-4/5 mt-4 text-xl font-semibold py-2 rounded-md"
        >
          Add to cart
        </Button>
        <Button
          variant="secondary"
          className="w-1/5 mt-4 text-xl font-semibold py-2 rounded-md"
        >
          LIKE
        </Button>
      </div>
    </div>
  );
};
