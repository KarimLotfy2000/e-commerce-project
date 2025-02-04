"use client";

import React from "react";
import ProductCard from "@/components/ProductsList/ProductCard/ProductCard";
import { Product } from "@/config/types/product";

type ProductsListProps = {
  products: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="flex w-full flex-col min-h-vh">
      <div className="mx-auto flex flex-col justify-between">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
