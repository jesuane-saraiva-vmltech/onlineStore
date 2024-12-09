import { CartItem } from "./Cart";
import { Product } from "./Product";

export enum ImageSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}
export enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export type BaseProductCardProps = {
  product: Product;
  children?: React.ReactNode;
  imageSize?: ImageSize;
  direction?: Direction;
};

export type CartProductCardProps = {
  cartItem: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
};

export type WishlistProductCardProps = {
  product: Product;
  onMoveToCart: () => void;
  onRemove: () => void;
};
