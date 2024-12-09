import { createContext, useContext, useState } from "react";
import { WishlistContextType } from "../types/Wishlist";
import { Product } from "../types/Product";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setItems((prevItems) =>
      prevItems.some((item) => item.id === product.id)
        ? prevItems.filter((item) => item.id !== product.id)
        : [...prevItems, product]
    );
  };

  const total = items.reduce((sum) => sum + 1, 0);

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, total, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
