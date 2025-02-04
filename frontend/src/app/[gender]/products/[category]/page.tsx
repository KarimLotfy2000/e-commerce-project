import ProductsPage from "@/components/ProductsPage/ProductsPage";
import { getFilteredProducts } from "@/lib/api/productService";
import { notFound } from "next/navigation";

export default async function ProductsPageDynamic({
  params,
  searchParams,
}: {
  params: { gender: string; category?: string };
  searchParams: { page?: string; size?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.size ? parseInt(searchParams.size) : 10;
  const { category } = params;

  const validGenders: { [key: string]: "MEN" | "WOMEN" } = {
    men: "MEN",
    women: "WOMEN",
  };

  const gender = validGenders[params.gender.toLowerCase()];
  if (!gender) {
    return notFound();
  }

  const {
    content: products,
    totalPages,
    totalElements,
  } = await getFilteredProducts({
    gender,
    category,
    page: currentPage - 1,
    size: pageSize,
  });

  return (
    <ProductsPage
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      totalElements={totalElements}
      pageSize={pageSize}
    />
  );
}
