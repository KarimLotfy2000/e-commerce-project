type Rating = {
  rate: number;
  count: number;
};
type Images = {
  primary: string;
  secondary: string[];
};

type Sizes = {
  [key: string]: boolean;
};
export type GetAllProductsResponse = {
  id: string;
  brand: string;
  material: string;
  title: string;
  price: number;
  description?: string;
  category: string;
  images: Images;
  rating: Rating;
  sizes: Sizes;
};
export type GetProductResponse = {
  id: string;
  images: string[];
  price: number;
  title: string;
  sizes: Sizes;
  category: string;
  rating: Rating;
  gender: string;
  description: string;
  material: string;
  brand: string;
};
