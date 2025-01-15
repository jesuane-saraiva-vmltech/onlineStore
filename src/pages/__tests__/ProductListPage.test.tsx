import { useQuery } from "@tanstack/react-query";
import { screen, fireEvent } from "@testing-library/react";

import ProductListPage from "../ProductListPage";

import { renderWithRouter, mockProduct } from "../../utils/testUtils";

import { Order } from "../../types/ProductListingPage";

// Mock the react-query hook
jest.mock("@tanstack/react-query");

describe("ProductListPage", () => {
  const mockProducts = [
    { ...mockProduct, id: "1", price: 10, title: "Cheap Product" },
    { ...mockProduct, id: "2", price: 20, title: "Expensive Product" },
    { ...mockProduct, id: "3", price: 15, title: "Medium Product" },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    renderWithRouter(<ProductListPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders product list", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProducts,
      isFetching: false,
    });

    renderWithRouter(<ProductListPage />);
    expect(screen.getByText("All Products")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(mockProducts.length);
  });

  it("sorts products correctly", () => {
    let currentProducts = [...mockProducts];
    (useQuery as jest.Mock).mockImplementation(({ select }) => ({
      isLoading: false,
      error: null,
      data: select ? select(currentProducts) : currentProducts,
      isFetching: false,
    }));

    renderWithRouter(<ProductListPage />);

    // Initial state (price ascending)
    let products = screen.getAllByRole("listitem");
    expect(products[0]).toHaveTextContent("Cheap Product");
    expect(products[2]).toHaveTextContent("Expensive Product");

    // Change to price descending
    const sortSelect = screen.getByLabelText("Sort products by");
    fireEvent.change(sortSelect, { target: { value: Order.PriceDesc } });

    // Verify order changed
    products = screen.getAllByRole("listitem");
    expect(products[0]).toHaveTextContent("Expensive Product");
    expect(products[2]).toHaveTextContent("Cheap Product");
  });

  it("shows loading overlay while fetching", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProducts,
      isFetching: true,
    });

    renderWithRouter(<ProductListPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders empty state message when no products", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
      isFetching: false,
    });

    renderWithRouter(<ProductListPage />);
    expect(screen.getByText(/Unable to load products/i)).toBeInTheDocument();
  });
});
