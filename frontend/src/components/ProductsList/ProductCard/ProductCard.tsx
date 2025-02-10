"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Product } from "@/config/types/product";
import ImageComponent from "@/components/ui/image";
import { generateProductSlug } from "@/lib/utils";

const ProductCard: React.FC<Product> = ({
  id,
  brand,
  name,
  price,
  color,
  image,
}) => {
  return (
    <Link href={`/products/${generateProductSlug(id, name, brand)}`}>
      <Card className="flex flex-col hover:pointer justify-between w-full max-w-[200px] sm:max-w-[350px] mx-auto">
        <CardHeader className="flex p-0 flex-col">
          <div className="w-full h-[250px] sm:h-[450px] flex items-center justify-center bg-gray-200">
            <ImageComponent
              src={image || "/images/placeholder.svg"}
              alt={`${name} ${brand}`}
              width={300}
              height={300}
              className="w-auto h-full object-contain border rounded-sm border-gray-300"
            />
          </div>

          <CardTitle className="text-start pl-3 text-sm sm:text-lg font-semibold mt-3">
            {brand + " " + name}
          </CardTitle>
          <CardDescription className="text-start pl-3 text-xs sm:text-sm text-gray-500">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow mt-1 pl-3 flex flex-col text-start">
          <p className="text-gray-800 font-bold text-sm sm:text-lg">
            ${price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
