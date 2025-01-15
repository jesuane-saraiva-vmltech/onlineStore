import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";

import Cart from "../Cart";

import { CartItem } from "../../../types/Cart";

import { mockCartItems } from "../../../utils/testUtils";

import styles from "../../../styles/css/components/cart/Cart.module.css";

// Mock the CartContext
jest.mock("../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

// Mock the CartProductCard component
jest.mock("../CartProductCard", () => {
  return function MockCartProductCard({
    cartItem,
    onUpdateQuantity,
    onRemove,
  }: {
    cartItem: CartItem;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
  }) {
    return (
      <div data-testid="cart-product-card">
        <span>Product: {cartItem.title}</span>
        <button onClick={() => onUpdateQuantity(2)}>Update Quantity</button>
        <button onClick={onRemove}>Remove</button>
      </div>
    );
  };
});

const mockUpdateQuantity = jest.fn();
const mockRemoveItem = jest.fn();

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render cart title", () => {
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      items: [],
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    const title = screen.getByRole("heading", { name: /my cart/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("tabIndex", "0");
  });

  it("should display empty cart message when there are no items", () => {
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      items: [],
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Your shopping cart is empty."
    );
  });

  it("should render cart items when they exist", () => {
    (require("../../../context/CartContext") as any).useCart.mockReturnValue({
      items: mockCartItems,
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    const cartItems = screen.getAllByTestId("cart-product-card");
    expect(cartItems).toHaveLength(2);
    expect(screen.getByText("Product: Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product: Test Product 2")).toBeInTheDocument();
  });

  it("should call updateQuantity when quantity is updated", () => {
    require("../../../context/CartContext").useCart.mockReturnValue({
      items: mockCartItems,
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    const updateButtons = screen.getAllByText("Update Quantity");
    updateButtons[0].click();

    expect(mockUpdateQuantity).toHaveBeenCalledWith("1", 2);
  });

  it("should call removeItem when remove button is clicked", () => {
    require("../../../context/CartContext").useCart.mockReturnValue({
      items: mockCartItems,
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    const removeButtons = screen.getAllByText("Remove");
    removeButtons[0].click();

    expect(mockRemoveItem).toHaveBeenCalledWith("1");
  });

  describe("Accessibility", () => {
    it("should have correct ARIA attributes", () => {
      (require("../../../context/CartContext") as any).useCart.mockReturnValue({
        items: [],
        updateQuantity: mockUpdateQuantity,
        removeItem: mockRemoveItem,
      });

      render(<Cart />);

      const section = screen.getByRole("region", { name: /my cart/i });
      expect(section).toHaveAttribute("aria-labelledby", "cart-heading");

      const cartIcon = screen.getByRole("img", { hidden: true });
      expect(cartIcon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Styling", () => {
    it("should apply correct CSS classes", () => {
      (require("../../../context/CartContext") as any).useCart.mockReturnValue({
        items: mockCartItems,
        updateQuantity: mockUpdateQuantity,
        removeItem: mockRemoveItem,
      });

      render(<Cart />);

      expect(screen.getByRole("region")).toHaveClass(styles.cart);
      expect(screen.getByRole("heading")).toHaveClass(styles.title);
      expect(screen.getByRole("list")).toHaveClass(styles.cartList);
      const listItems = screen.getAllByRole("listitem");
      listItems.forEach((item) => {
        expect(item).toHaveClass(styles.cartItem);
      });
    });
  });
});
