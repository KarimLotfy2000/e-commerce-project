"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/config/types/cart";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "@/store/slices/cartSlice";
import ImageComponent from "@/components/ui/image";
import { generateProductSlug } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { quantity, subtotal, sizeVariant, id } = item;
  const { product, size, price } = sizeVariant;

  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateCartQuantity({ cartItemId: id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex relative items-center  gap-3 sm:gap-4 p-4 border rounded-lg shadow-sm bg-white">
      <Link
        href={`/products/${generateProductSlug(
          product.id,
          product.name,
          product.brand
        )}`}
        className="flex items-center gap-4 flex-1 group"
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 relative">
          <ImageComponent
            src={product.image || "/images/placeholder.svg"}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-sm sm:text-lg font-semibold group-hover:underline">
            {product.brand} {product.name}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">Size: {size}</p>
          <p className="text-gray-700 font-semibold text-sm sm:text-base">
            Price: {price.toFixed(2)} €
          </p>
        </div>
      </Link>

      <div className="flex sm:items-end items-center gap-4">
        <div className="flex flex-col">
          <p className="text-gray-500 text-xs sm:text-sm">Quantity</p>
          <Select
            onValueChange={(value) => handleQuantityChange(Number(value))}
            defaultValue={quantity.toString()}
          >
            <SelectTrigger className="w-14 sm:w-16 mt-1 sm:mt-2">
              <SelectValue placeholder={quantity.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                <SelectItem key={q} value={q.toString()}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-center sm:items-center sm:flex sm:flex-col">
          <p className="text-sm sm:text-lg mt-4 sm:mt-0 font-bold w-16 sm:w-24">
            {subtotal.toFixed(2)} €
          </p>
          <Button
            onClick={handleRemove}
            variant="destructive"
            size="sm"
            className="hidden sm:block mt-1 sm:mt-2"
          >
            Remove
          </Button>
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="sm"
            className="block sm:hidden absolute top-1 right-1"
          >
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
