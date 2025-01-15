import { createContext, useContext, useState } from "react";

import { Product } from "../types/Product";
import { WishlistContextType } from "../types/Wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Provider component that wraps app/components that need access to wishlist state
export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<Product[]>([]);

  // Toggle product in/out of wishlist
  // If product exists -> remove it, if not -> add it
  const toggleWishlist = (product: Product) => {
    setItems((prevItems) =>
      prevItems.some((item) => item.id === product.id)
        ? prevItems.filter((item) => item.id !== product.id)
        : [...prevItems, product]
    );
  };

  // Calculate total number of items in wishlist
  const total = items.reduce((sum) => sum + 1, 0);

  // Check if a product is already in wishlist by its ID
  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  // Provide wishlist state and functions to children components
  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, total, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
