import { screen, fireEvent } from "@testing-library/react";

import WishlistProductCard from "../WishlistProductCard";

import { renderWithRouter, mockProduct } from "../../../utils/testUtils";

describe("WishlistProductCard", () => {
  const mockOnMoveToCart = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information and buttons", () => {
    renderWithRouter(
      <WishlistProductCard
        product={mockProduct}
        onMoveToCart={mockOnMoveToCart}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText("Move to Cart")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it("calls onMoveToCart when move to Cart button is clicked", () => {
    renderWithRouter(
      <WishlistProductCard
        product={mockProduct}
        onMoveToCart={mockOnMoveToCart}
        onRemove={mockOnRemove}
      />
    );

    fireEvent.click(screen.getByText("Move to Cart"));
    expect(mockOnMoveToCart).toHaveBeenCalledTimes(1);
  });

  it("calls onRemove when Remove button is clicked", () => {
    renderWithRouter(
      <WishlistProductCard
        product={mockProduct}
        onMoveToCart={mockOnMoveToCart}
        onRemove={mockOnRemove}
      />
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
