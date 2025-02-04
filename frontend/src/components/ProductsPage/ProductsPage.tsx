"use client";
import SaleCategoryBanner from "@/components/SaleCategoryBanner/SaleCategoryBanner";
import ProductsList from "@/components/ProductsList/ProductsList";
import Pagination from "@/components/Pagination/Pagination";
import { Product } from "@/config/types/product";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
export type ProductsPageProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

export default function ProductsPage({
  products,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
}: ProductsPageProps) {
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {categories && (
        <SaleCategoryBanner discount="30" categories={categories} />
      )}
      <ProductsList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        pageSize={pageSize}
      />
    </div>
  );
}
