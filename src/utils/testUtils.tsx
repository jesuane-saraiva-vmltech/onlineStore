import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { CartItem } from "../types/Cart";

// Helper function to render component with Router
export const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
};

// Mock product data
export const mockProduct = {
  id: "1",
  title: "Test Product",
  description: "Description product",
  price: 99.99,
  image: "test-image.jpg",
  quantity: 1,
};

// Mock FramerMotion
export const mockFramerMotion = {
  motion: {
    header: "header",
  },
};

// Mock Components
export const mockCartComponent = () => <div>Cart Content</div>;
export const mockWishlistComponent = () => <div>Wishlist Content</div>;

// Mock Contexts
export const mockCartContext = {
  useCart: () => ({
    totalQuantity: 5,
  }),
};

// Mock cart items
export const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: "Test Product 1",
    description: "",
    price: 99.99,
    quantity: 1,
    image: "test-image-1.jpg",
  },
  {
    id: "2",
    title: "Test Product 2",
    description: "",
    price: 149.99,
    quantity: 2,
    image: "test-image-2.jpg",
  },
];
