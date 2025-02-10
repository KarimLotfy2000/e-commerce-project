export interface ProductFilterParams {
  category?: string;
  brand?: string;
  gender?: "MEN" | "WOMEN";
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "name" | "brand";
  order?: "asc" | "desc";
  color?: string;
  page?: number;
  size?: number;
}

export interface FiltersResponse {
  brands: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
}
