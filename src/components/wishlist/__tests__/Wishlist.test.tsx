import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import Wishlist from "../Wishlist";
import { Product } from "../../../types/Product";
import styles from "../../../styles/css/components/wishlist/Wishlist.module.css";
import { mockCartItems as mockItems } from "../../../utils/testUtils";

// Mock the WishlistContext
jest.mock("../../../context/WishlistContext", () => ({
  useWishlist: jest.fn(),
}));

// Mock the CartContext (since Wishlist uses it for moveToCart)
jest.mock("../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

// Mock the WishlistProductCard component
jest.mock("../WishlistProductCard", () => {
  return function MockWishlistProductCard({
    product,
    onMoveToCart,
    onRemove,
  }: {
    product: Product;
    onMoveToCart: () => void;
    onRemove: () => void;
  }) {
    return (
      <div data-testid="wishlist-product-card">
        <span>Product: {product.title}</span>
        <button onClick={onMoveToCart}>Move to Cart</button>
        <button onClick={onRemove}>Remove</button>
      </div>
    );
  };
});

const mockToggleWishlist = jest.fn();
const mockAddToCart = jest.fn();

describe("Wishlist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render wishlist title", () => {
    (
      require("../../../context/WishlistContext") as any
    ).useWishlist.mockReturnValue({
      items: [],
      toggleWishlist: mockToggleWishlist,
    });
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      addItem: mockAddToCart,
    });

    render(<Wishlist />);

    const title = screen.getByRole("heading", { name: /my wishlist/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("tabIndex", "0");
  });

  it("should display empty wishlist message when there are no items", () => {
    (
      require("../../../context/WishlistContext") as any
    ).useWishlist.mockReturnValue({
      items: [],
      toggleWishlist: mockToggleWishlist,
    });
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      addItem: mockAddToCart,
    });

    render(<Wishlist />);

    expect(screen.getByRole("status")).toHaveTextContent("Wishlist is empty.");
  });

  it("should render wishlist items when they exist", () => {
    (
      require("../../../context/WishlistContext") as any
    ).useWishlist.mockReturnValue({
      items: mockItems,
      toggleWishlist: mockToggleWishlist,
    });
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      addItem: mockAddToCart,
    });

    render(<Wishlist />);

    const wishlistItems = screen.getAllByTestId("wishlist-product-card");
    expect(wishlistItems).toHaveLength(2);
    expect(screen.getByText("Product: Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product: Test Product 2")).toBeInTheDocument();
  });

  it("should handle move to cart action", () => {
    (
      require("../../../context/WishlistContext") as any
    ).useWishlist.mockReturnValue({
      items: mockItems,
      toggleWishlist: mockToggleWishlist,
    });
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      addItem: mockAddToCart,
    });

    render(<Wishlist />);

    const moveToCartButtons = screen.getAllByText("Move to Cart");
    moveToCartButtons[0].click();

    expect(mockToggleWishlist).toHaveBeenCalledWith(mockItems[0]);
    expect(mockAddToCart).toHaveBeenCalledWith(mockItems[0]);
  });

  it("should handle remove action", () => {
    (
      require("../../../context/WishlistContext") as any
    ).useWishlist.mockReturnValue({
      items: mockItems,
      toggleWishlist: mockToggleWishlist,
    });
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      addItem: mockAddToCart,
    });

    render(<Wishlist />);

    const removeButtons = screen.getAllByText("Remove");
    removeButtons[0].click();

    expect(mockToggleWishlist).toHaveBeenCalledWith(mockItems[0]);
  });

  describe("Accessibility", () => {
    it("should have correct ARIA attributes", () => {
      (
        require("../../../context/WishlistContext") as any
      ).useWishlist.mockReturnValue({
        items: [],
        toggleWishlist: mockToggleWishlist,
      });
      (require("../../../context/CartContext") as any).useCart.mockReturnValue({
        addItem: mockAddToCart,
      });

      render(<Wishlist />);

      expect(screen.getByRole("heading")).toHaveAttribute(
        "id",
        "wishlist-heading"
      );
      const section = screen.getByRole("region");
      expect(section).toHaveAttribute("aria-labelledby", "wishlist-heading");
    });
  });

  describe("Styling", () => {
    it("should apply correct CSS classes", () => {
      (
        require("../../../context/WishlistContext") as any
      ).useWishlist.mockReturnValue({
        items: mockItems,
        toggleWishlist: mockToggleWishlist,
      });
      (require("../../../context/CartContext") as any).useCart.mockReturnValue({
        addItem: mockAddToCart,
      });

      render(<Wishlist />);

      expect(screen.getByRole("region")).toHaveClass(styles.wishlist);
      expect(screen.getByRole("heading")).toHaveClass(styles.title);
      expect(screen.getByRole("list")).toHaveClass(styles.list);
      const listItems = screen.getAllByRole("listitem");
      listItems.forEach((item) => {
        expect(item).toHaveClass(styles.wishlistItems);
      });
    });
  });
});
