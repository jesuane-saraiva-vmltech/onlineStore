import { Product } from "./Product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  totalPrice: number;
  totalQuantity: number;
  updateQuantity: (id: string, quantity: number) => void;
}
