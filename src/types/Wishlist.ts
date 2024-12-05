import { Product } from "./Product";

export interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  total: number;
  isInWishlist: (id: string) => boolean;
}
