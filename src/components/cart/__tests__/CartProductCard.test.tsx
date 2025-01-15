import { screen, fireEvent } from "@testing-library/react";

import CartProductCard from "../CartProductCard";

import { renderWithRouter, mockCartItems } from "../../../utils/testUtils";

describe("CartProductCard", () => {
  const mockCartItem = mockCartItems[1];

  const mockOnUpdateQuantity = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return renderWithRouter(
      <CartProductCard
        cartItem={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );
  };

  it("renders product title and quantity", () => {
    renderComponent();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("2", { exact: true })).toBeInTheDocument();
  });

  it("calls onUpdateQuantity when increasing quantity", () => {
    renderComponent();
    const increaseButton = screen.getByLabelText(
      `Increase quantity of ${mockCartItem.title}`
    );
    fireEvent.click(increaseButton);
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(3);
  });

  it("calls onUpdateQuantity when decreasing quantity", () => {
    renderComponent();
    const decreaseButton = screen.getByLabelText(
      `Decrease quantity of ${mockCartItem.title}`
    );
    fireEvent.click(decreaseButton);
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1);
  });

  it("calls onRemove when remove button is clicked", () => {
    renderComponent();
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
