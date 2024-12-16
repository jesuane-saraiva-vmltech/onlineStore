import { screen } from "@testing-library/react";
import BaseProductCard from "../BaseProductCard";
import { ImageSize, Direction } from "../../../types/ProductCard";
import { mockProduct, renderWithRouter } from "../../../utils/testUtils";

describe("BaseProductCard", () => {
  test("renders product title", () => {
    renderWithRouter(<BaseProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  test("renders formatted price correctly", () => {
    renderWithRouter(<BaseProductCard product={mockProduct} />);

    expect(screen.getByText("€99.99")).toBeInTheDocument();
  });

  test("renders product image with correct alt text", () => {
    renderWithRouter(<BaseProductCard product={mockProduct} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Product");
  });

  test("renders children content", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Test Child Content</div>
      </BaseProductCard>
    );

    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });

  test("links to correct product page", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Child content</div>
      </BaseProductCard>
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/products/1");
    });
  });

  test("applies correct image size class", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct} imageSize={ImageSize.Large}>
        <div>Child content</div>
      </BaseProductCard>
    );

    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveClass("imageLarge");
  });

  test("applies correct direction class", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct} direction={Direction.Horizontal}>
        <div>Child content</div>
      </BaseProductCard>
    );

    const imageContainer = screen.getByTestId("container");
    expect(imageContainer).toHaveClass("horizontal");
  });

  test("uses default image size when not specified", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Child content</div>
      </BaseProductCard>
    );

    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toHaveClass("imageMedium");
  });

  test("uses default direction when not specified", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Child content</div>
      </BaseProductCard>
    );

    const imageContainer = screen.getByTestId("container");
    expect(imageContainer).toHaveClass("vertical");
  });

  // Accessibility tests
  test("has accessible price information", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Child content</div>
      </BaseProductCard>
    );

    expect(screen.getByLabelText("Price: €99.99")).toHaveAttribute(
      "tabIndex",
      "0"
    );
  });

  test("has accessible product image link", () => {
    renderWithRouter(
      <BaseProductCard product={mockProduct}>
        <div>Child content</div>
      </BaseProductCard>
    );

    expect(screen.getByLabelText("Poduct image")).toBeInTheDocument();
  });
});
