import { Product } from "./Product";

export type BaseProductCardProps = {
  product: Product;
  children?: React.ReactNode;
  moduleStyles?: string;
};

export type CartProductCardProps = {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
};

export type WishlistProductCardProps = {
  product: Product;
  onMoveToCart: () => void;
  onRemove: () => void;
};
