export interface Cart {
  id: number;
  totalPrice: number;
  totalItems: number;
  cartItems: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  subtotal: number;
  sizeVariant: {
    id: number;
    size: string;
    price: number;
    product: {
      id: number;
      brand: string;
      name: string;
      image: string | null;
    };
  };
}
