import { ProductFilterParams } from "@/config/types/filter";
import {
  ApiResponse,
  ProductInfo,
  Product,
  PaginatedResponse,
} from "@/config/types/product";
import api from "@/lib/api/apiClient";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>(
      "/products/previews"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product previews:", error);
    throw error;
  }
};

export const getFilteredProducts = async (
  params: ProductFilterParams
): Promise<PaginatedResponse<Product>> => {
  try {
    const response = await api.get<PaginatedResponse<Product>>(
      "/products/filter",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<ProductInfo> => {
  try {
    const response = await api.get<ApiResponse<ProductInfo>>(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};
