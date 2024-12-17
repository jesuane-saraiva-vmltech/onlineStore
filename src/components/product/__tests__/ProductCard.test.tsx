import { screen, fireEvent, act } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { renderWithRouter, mockProduct } from "../../../utils/testUtils";
import { TIMEOUTS } from "../../../utils/constants";

describe("ProductCard", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders product with add to cart button", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockProduct.price}`)).toBeInTheDocument();
  });

  it("changes button text after adding to cart", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    expect(screen.getByText("Added!")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(TIMEOUTS.SUCCESS_FEEDBACK);
    });

    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });

  it("toggles wishlist status when clicking wishlist button", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const wishlistButton = screen.getByRole("button", {
      name: /Add to wishlist/i,
    });

    fireEvent.click(wishlistButton);

    expect(
      screen.getByRole("button", {
        name: /Remove from wishlist/i,
      })
    ).toBeInTheDocument();
  });

  it("disables add to cart button while showing success message", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    expect(screen.getByText("Added!")).toBeDisabled();

    fireEvent.click(addButton);

    expect(screen.getByText("Added!")).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(TIMEOUTS.SUCCESS_FEEDBACK);
    });

    expect(screen.getByText(/Add to Cart/i)).toBeEnabled();
  });
});
