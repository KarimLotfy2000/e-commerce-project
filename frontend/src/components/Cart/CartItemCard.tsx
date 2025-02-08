import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CartItem } from "@/config/types/cart";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "@/store/slices/cartSlice";
import Link from "next/link";
import ImageComponent from "../ui/image";

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
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white">
      <Link
        href={`/products/${product.id}`}
        className="flex items-center gap-4 flex-1 group"
      >
        <div className="w-24 h-24 relative">
          <ImageComponent
            src={product.image || "/images/placeholder.svg"}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold group-hover:underline">
            {product.brand} {product.name}
          </h2>
          <p className="text-gray-500 text-sm">Size: {size}</p>
          <p className="text-gray-700 font-semibold">
            Price: {price.toFixed(2)} €
          </p>
        </div>
      </Link>

      <div className="flex items-end gap-4">
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm">Quantity</p>
          <Select
            onValueChange={(value) => handleQuantityChange(Number(value))}
            defaultValue={quantity.toString()}
          >
            <SelectTrigger className="w-16 mt-2">
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

        <div className="text-center">
          <p className="text-lg font-bold">{subtotal.toFixed(2)} €</p>
          <Button
            onClick={handleRemove}
            variant="destructive"
            size="sm"
            className="mt-2"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
