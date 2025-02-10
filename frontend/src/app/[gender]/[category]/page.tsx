import ProductsPage from "@/components/ProductsPage/ProductsPage";
import { getFilteredProducts } from "@/lib/api/productService";
import { notFound } from "next/navigation";
import { ProductFilterParams } from "@/config/types/filter";

export default async function CategoryProductsPage({
  params,
  searchParams,
}: {
  params: { gender: string; category: string };
  searchParams: Record<string, string>;
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.size ? parseInt(searchParams.size) : 12;

  const validGenders: { [key: string]: "MEN" | "WOMEN" } = {
    men: "MEN",
    women: "WOMEN",
  };

  const gender = validGenders[params.gender.toLowerCase()];
  if (!gender) {
    return notFound();
  }

  const category =
    params.category.toLowerCase() === "all" ? undefined : params.category;

  const filterParams: ProductFilterParams = {
    gender,
    category,
    brand: searchParams.brand || undefined,
    color: searchParams.color || undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: ["price", "name", "brand"].includes(searchParams.sortBy)
      ? (searchParams.sortBy as "price" | "name" | "brand")
      : undefined,
    order:
      searchParams.order === "asc" || searchParams.order === "desc"
        ? searchParams.order
        : undefined,
    page: searchParams.page ? Number(searchParams.page) - 1 : 0,
    size: searchParams.size ? Number(searchParams.size) : 12,
  };
  const {
    content: products,
    totalPages,
    totalElements,
  } = await getFilteredProducts(filterParams);

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
