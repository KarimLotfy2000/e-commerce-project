"use client";

import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "@/store/slices/cartSlice";
import { ProductInfo } from "@/config/types/product";
import { AppDispatch, RootState } from "@/store/store";
import useAuth from "@/hooks/use-auth";
import { setError } from "@/store/slices/errorSlice";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
  const { name, price, description, sizeVariants, brand, color } = product;
  const availableSizes = sizeVariants.filter(({ stock }) => stock > 0);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedSizeVariantId, setSelectedSizeVariantId] = useState<
    number | null
  >(null);
  const { loading } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, showLoginModal } = useAuth();

  const shouldApplyDiscount =
    (selectedPrice === null || selectedPrice === price) && discount > 0;

  const displayedPrice = selectedPrice !== null ? selectedPrice : price;
  const discountedPrice = shouldApplyDiscount
    ? price * (1 - discount / 100)
    : displayedPrice;

  const handleSizeChange = (size: string) => {
    const selectedVariant = availableSizes.find((s) => s.size === size);
    if (selectedVariant) {
      setSelectedPrice(selectedVariant.price);
      setSelectedSizeVariantId(selectedVariant.id);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(
        setError({
          message: "Please login first to be able to add an item to the cart!",
          type: "error",
        })
      );
      showLoginModal();
      return;
    }
    if (selectedSizeVariantId) {
      dispatch(addToCart(selectedSizeVariantId));
    }
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
      <h1 className="text-2xl">{brand}</h1>
      <h1 className="text-4xl mt-2 font-bold">{name}</h1>
      <p className="text-lg text-gray-600 mt-2">
        <span className="font-bold">Color:</span> {color}
      </p>
      <p className="text-sm flex items-center gap-x-2 text-gray-500 mt-2">
        {rating.rate.toFixed(1)} {renderStars(rating.rate)}
        <span className="text-sm text-gray-500">({rating.count} reviews)</span>
      </p>

      <div className="mt-2">
        <div className="flex items-baseline space-x-2">
          <span
            className={classNames("text-xl font-bold", {
              "text-red-600": shouldApplyDiscount,
              "text-gray-600": !shouldApplyDiscount,
            })}
          >
            {discountedPrice.toFixed(2)} €
          </span>
          {shouldApplyDiscount && (
            <span className="text-xl text-gray-500 line-through">
              {price.toFixed(2)} €
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">VAT included</p>
      </div>

      <div className="flex flex-col mt-2 space-y-2">
        {description && (
          <span className="text-xl text-gray-600 inline">
            {description || "No description available."}
          </span>
        )}
      </div>

      <div className="mt-4">
        <Select onValueChange={handleSizeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sizes</SelectLabel>
              {availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <SelectItem key={size.id} value={size.size}>
                    {size.size}
                    {size.price !== price && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({size.price} €)
                      </span>
                    )}
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

      {/* ✅ Buttons */}
      <div className="flex gap-x-3">
        <Button
          disabled={selectedSizeVariantId === null}
          variant="accent"
          className="w-full mt-4 text-xl font-semibold py-2 rounded-md"
          onClick={handleAddToCart}
        >
          {loading ? (
            <div className="flex items-center gap-x-2 justify-center">
              <span>Adding to cart</span> <LoadingSpinner />
            </div>
          ) : (
            "Add to Cart"
          )}
        </Button>
        {/* <Button
          variant="primary"
          className="w-1/5 mt-4 text-lg font-semibold py-2 rounded-md"
        >
          LIKE
        </Button> */}
      </div>
    </div>
  );
};
