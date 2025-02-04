import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../ProductsList/ProductCard/ProductCard";

const recommendedItems = [
  {
    gender: "MEN",
    category: "Clothing",
    title: "Nike Jeans",
    rating: {
      rate: 1.1,
      count: 322,
    },
    price: 140.08,
    id: "1ZQ0uRiUGVZzWQCku9nu",
    primaryImage:
      "https://picsum.photos/seed/89161b70-f163-41d0-bdb2-ea2da90fbb92/600/400",
  },
  {
    title: "Prada T-shirt",
    gender: "MEN",
    category: "Accessories",
    price: 212.88,
    id: "5Y5Kp17sQETxqKCDWe4d",
    rating: {
      count: 217,
      rate: 5,
    },
    primaryImage:
      "https://picsum.photos/seed/d822a605-9213-454f-969c-fcf56b02045f/600/400",
  },
  {
    price: 71.09,
    id: "6UoUyj6pAUbSxRbbcl54",
    title: "Adidas Jeans",
    rating: {
      count: 111,
      rate: 3.7,
    },
    gender: "MEN",
    category: "Clothing",
    primaryImage:
      "https://picsum.photos/seed/07967b61-98f7-4310-a3bb-7a0f45d1422e/600/400",
  },
  {
    id: "9b5Mt7l4ve8HTYdj00n5",
    rating: {
      count: 205,
      rate: 3.8,
    },
    title: "Prada Sneakers",
    price: 105.6,
    category: "Clothing",
    gender: "MEN",
    primaryImage:
      "https://picsum.photos/seed/200e4562-8219-42a9-a887-f0184fd0a83d/600/400",
  },
  {
    price: 32.38,
    rating: {
      rate: 1.1,
      count: 460,
    },
    gender: "MEN",
    category: "Shoes",
    id: "E0VcEqiDmJYbtF81yqjk",
    title: "H&M Jeans",
    primaryImage:
      "https://picsum.photos/seed/6a78f877-59d1-4050-815d-67f213d1becc/600/400",
  },
  {
    gender: "MEN",
    price: 222.58,
    category: "Accessories",
    title: "Versace Dress",
    id: "MAMzNHitLijkTKPVir6y",
    rating: {
      count: 142,
      rate: 1.8,
    },
    primaryImage:
      "https://picsum.photos/seed/b41431d8-1078-4427-97ad-98d6ea57e448/600/400",
  },
  {
    id: "someUniqueId",
    rating: {
      count: 30,
      rate: 2.9,
    },
    price: 468.83,
    gender: "MEN",
    title: "Adidas Dress",
    category: "Clothing",
    primaryImage:
      "https://picsum.photos/seed/dbbed6c6-97da-48ed-ab67-4ed3621522d7/600/400",
  },
];

export function RecommendedItemsSlider() {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        loop: true,
      }}
      className="  mx-10"
    >
      <CarouselContent>
        {recommendedItems.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
          >
            <ProductCard key={item.id} {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
