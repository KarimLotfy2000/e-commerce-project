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
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import classNames from "classnames";

export type ProductDescriptionProps = {
  price: number;
  title: string;
  sizes: { [key: string]: boolean };
  category: string;
  rating: { count: number; rate: number };
  gender: string;
  description: string;
  material: string;
  brand: string;
  discount?: number;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  price,
  title,
  sizes,
  category,
  rating,
  gender,
  description,
  material,
  brand,
  discount = 0,
}) => {
  const discountedPrice = price * (1 - discount / 100); //normally calculations should be done by the backend
  const originalPrice = price;

  const availableSizes = Object.entries(sizes)
    .filter(([_, available]) => available)
    .map(([size]) => size);

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
    <div className="w-full max-w-md p-6 bg-white">
      <h1 className="text-4xl mt-2 font-bold">{title}</h1>
      <p className="text-3xl text-gray-600"> {brand}</p>
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
        <span className="font-bold">Category:</span> {category}
      </p>
      <p className="text-xl text-gray-600 mt-2">
        <span className="font-bold">Material:</span> {material}
      </p>
      <p className="text-xl text-gray-600 my-2">
        <span className="font-bold">Gender:</span> {gender}
      </p>
      {renderStars(rating.rate)}
      <span className="ml-2 text-sm text-gray-500">
        ({rating.count} reviews)
      </span>
      <p className="text-2xl text-gray-600 mt-2">{description}</p>

      <div className="mt-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sizes</SelectLabel>
              {availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
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
