import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { screen, fireEvent, act } from "@testing-library/react";

import ProductPage from "../ProductPage";

import { renderWithRouter, mockProduct } from "../../utils/testUtils";

// Mock the hooks
jest.mock("@tanstack/react-query");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("ProductPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
  });

  it("redirects to products page if no ID is provided", () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
    });

    renderWithRouter(<ProductPage />);
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("renders loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    renderWithRouter(<ProductPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders error state when product not found", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Product not found"),
      data: null,
    });

    renderWithRouter(<ProductPage />);
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it("renders product details", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProduct,
    });

    renderWithRouter(<ProductPage />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`€${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockProduct.image);
  });

  it("handles add to cart action", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProduct,
    });

    renderWithRouter(<ProductPage />);

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    expect(screen.getByText("Added!")).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it("navigates back to products page", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProduct,
    });

    renderWithRouter(<ProductPage />);

    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("shows success message temporarily after adding to cart", () => {
    jest.useFakeTimers();

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProduct,
    });

    renderWithRouter(<ProductPage />);

    fireEvent.click(screen.getByText(/Add to Cart/i));
    expect(screen.getByText("Added!")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();

    jest.useRealTimers();
  });
});
