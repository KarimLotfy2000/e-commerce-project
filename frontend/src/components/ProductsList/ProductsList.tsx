"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard, {
  ProductCardProps,
} from "@/components/ProductsList/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";

type ProductsListProps = {
  products: ProductCardProps[];
  initialPage?: number;
  productsPerPage: number;
};

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  initialPage = 1,
  productsPerPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPageFromUrl =
    parseInt(searchParams.get("page") || "") || initialPage;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    if (currentPage !== currentPageFromUrl) {
      router.push(`?page=${currentPage}`, undefined);
    }
  }, [currentPage, currentPageFromUrl, router]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex w-full flex-col min-h-vh">
      <div className="mx-auto flex flex-col justify-between">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-14">
          {" "}
          {/**adjust responsiveness */}
          {currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "secondary" : "default"}
            className="mx-1"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
