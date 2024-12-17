import { screen } from "@testing-library/react";
import { renderWithRouter, mockProduct } from "../../../utils/testUtils";
import Wishlist from "../Wishlist";

describe("Wishlist", () => {
  it("displays wishlist title", () => {
    renderWithRouter(<Wishlist />);
    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
  });

  it("displays empty message when wishlist has no items", () => {
    renderWithRouter(<Wishlist />);
    expect(screen.getByText("Wishlist is empty.")).toBeInTheDocument();
  });

  it("renders list of wishlist items when items exist", () => {
    // Mock the useWishlist hook to return items
    const mockItems = [mockProduct];
    jest
      .spyOn(require("../../../context/WishlistContext"), "useWishlist")
      .mockReturnValue({
        items: mockItems,
        toggleWishlist: jest.fn(),
      });

    renderWithRouter(<Wishlist />);
    expect(screen.queryByText("Wishlist is empty.")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
