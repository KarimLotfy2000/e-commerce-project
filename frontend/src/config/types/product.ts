export interface ApiResponse<T> {
  message: string;
  data: T;
}
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProductFilterParams {
  category?: string;
  brand?: string;
  gender?: "MEN" | "WOMEN" | "UNISEX";
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "name" | "brand";
  order?: "asc" | "desc";
  page?: number;
  size?: number;
}
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string | null;
  price: number;
}

export interface ProductInfo {
  id: number;
  name: string;
  description: string | null;
  color: string;
  brand: string;
  material: string;
  price: number;
  gender: "MEN" | "WOMEN" | "UNISEX";
  categoryId: number;
  categoryName: string;
  images: string[];
  sizeVariants: SizeVariant[];
}

export interface SizeVariant {
  id: number;
  size: string;
  stock: number;
  price: number;
}

export interface Category {
  id: number;
  name: string;
}
