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

export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  category: string;
  primaryImage: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  primaryImage,
}) => {
  return (
    <Card className="flex flex-col border-gray-300 hover:pointer shadow-lg justify-between h-full">
      <CardHeader className="flex p-0 flex-col items-center">
        <div className="relative w-full h-56">
          <Image
            src={primaryImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <CardTitle className="text-center text-xl font-semibold mt-3">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          {category}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-800 font-bold">${price.toFixed(2)}</p>
        <p className="text-gray-600 mt-1 text-sm flex-grow"></p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between gap-x-10 items-center">
        <Button size={"sm"} variant="default" asChild>
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>

        <Button size={"sm"} variant={"secondary"}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
