"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Product } from "@/config/types/product";
import ImageComponent from "@/components/ui/image";

const ProductCard: React.FC<Product> = ({
  id,
  brand,
  name,
  price,
  category,
  image,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="flex flex-col hover:pointer  justify-between h-full">
        <CardHeader className="flex p-0 flex-col items-center">
          <div className="w-full max-w-[350px] h-[450px] flex items-center justify-center bg-gray-200">
            <ImageComponent
              src={image || "/images/placeholder.svg"}
              alt={`${name} ${brand}`}
              width={300}
              height={300}
              className="w-auto h-full object-contain border rounded-sm border-gray-300"
            />
          </div>
          <CardTitle className="pr-3 text-start text-xl font-semibold mt-3">
            {brand + " " + name}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow mt-1 flex flex-col">
          <p className="text-gray-800 font-bold">${price.toFixed(2)}</p>
          <p className="text-gray-600 mt-1 text-sm flex-grow"></p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
