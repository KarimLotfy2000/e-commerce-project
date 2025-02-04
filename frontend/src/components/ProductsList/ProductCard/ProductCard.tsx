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
import { Button } from "@/components/ui/button";
import { Product } from "@/config/types/product";

const ProductCard: React.FC<Product> = ({
  id,
  brand,
  name,
  price,
  category,
  image,
}) => {
  image = null;
  return (
    <Link href={`/products/${id}`}>
      <Card className="flex flex-col hover:pointer  justify-between h-full">
        <CardHeader className="flex p-0 flex-col items-center">
          <div className="relative w-full h-52">
            <Image
              src={image || "/images/placeholder.svg"}
              alt={name + brand}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
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
