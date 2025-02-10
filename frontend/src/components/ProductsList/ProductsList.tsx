"use client";

import React from "react";
import ProductCard from "@/components/ProductsList/ProductCard/ProductCard";
import { Product } from "@/config/types/product";

type ProductsListProps = {
  products: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="flex w-full flex-col min-h-vh items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4 mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
