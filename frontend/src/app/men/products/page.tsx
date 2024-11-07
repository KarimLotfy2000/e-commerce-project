import ProductsList from "@/components/ProductsList/ProductsList";
import SaleCategoryBanner from "@/components/SaleCategoryBanner/SaleCategoryBanner";
import { CATEGORIES } from "@/consts";
 import { fetchProductsForMenPage } from "@/lib/backend";

export default async function MenProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const isInitialPage = !searchParams.page || searchParams.page === "1";

const products = await fetchProductsForMenPage();

  return (
    <>
      {isInitialPage && (
        <SaleCategoryBanner
          discount="20"
          categories={CATEGORIES} // This should be from a CMS or Backend
        />
      )}
      <ProductsList
        products={products}
        productsPerPage={8}
        initialPage={currentPage}
      />
    </>
  );
}
