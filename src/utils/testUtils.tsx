import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

// Helper function to render component with Router
export const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
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
