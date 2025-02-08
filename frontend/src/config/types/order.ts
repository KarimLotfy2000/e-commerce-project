export interface Address {
  id: number | null;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Product {
  id: number;
  brand: string;
  name: string;
  image: string | null;
}

export interface SizeVariant {
  id: number;
  size: string;
  price: number;
  product: Product;
}

export interface OrderItem {
  id: number;
  quantity: number;
  subtotal: number;
  sizeVariant: SizeVariant;
}

export interface Order {
  id: number;
  orderDate: string;
  address: Address;
  status: string;
  paymentMethod: string;
  totalPrice: number;
  orderItems: OrderItem[];
}
