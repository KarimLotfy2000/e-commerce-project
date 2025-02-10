"use client";
import SaleCategoryBanner from "@/components/SaleCategoryBanner/SaleCategoryBanner";
import ProductsList from "@/components/ProductsList/ProductsList";
import Pagination from "@/components/Pagination/Pagination";
import { Product } from "@/config/types/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import FiltersList from "@/components/Filters/FiltersList/FiltersList";
import { useSyncFilters } from "@/hooks/use-sync-filters";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import { resetFilters } from "@/store/slices/filtersSlice";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  if (!categories || !categories.length) {
    dispatch(fetchCategories());
  }

  const handleReset = () => {
    dispatch(resetFilters());
    router.push(`${pathName}`);
  };

  useSyncFilters();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {categories && (
        <SaleCategoryBanner discount="30" categories={categories} />
      )}
      <FiltersList />
      {products.length === 0 ? (
        <p className="text-md font-medium text-gray text-center">
          No products found. Try adjusting your filters or{" "}
          <button className="text-black-500 underline" onClick={handleReset}>
            resetting them
          </button>
          .
        </p>
      ) : (
        <>
          <ProductsList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
}
