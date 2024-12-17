import { screen, fireEvent } from "@testing-library/react";
import { mockFramerMotion, renderWithRouter } from "../../../utils/testUtils";
import Header from "../Header";
import styles from "../../styles/css/layout/Header.module.css";
import { setupDialogMocks } from "../../../utils/testSetup";

jest.mock("motion/react", () => mockFramerMotion);
jest.mock("../../cart/Cart", () => () => <div>Cart Content</div>);
jest.mock("../../wishlist/Wishlist", () => () => <div>Wishlist Content</div>);

describe("Header", () => {
  setupDialogMocks();

  it("should render the logo with correct link", () => {
    renderWithRouter(<Header />);

    const logoLink = screen.getByLabelText("YouGift homepage");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  describe("Navigation Menu", () => {
    it("should toggle menu when menu button is clicked", () => {
      renderWithRouter(<Header />);

      const menuButton = screen.getByLabelText("Open menu");
      const nav = screen.getByRole("navigation", { name: "Main" });

      expect(nav).not.toHaveClass(styles.isOpen);

      fireEvent.click(menuButton);
      expect(nav).toHaveClass(styles.isOpen);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
      expect(menuButton).toHaveAccessibleName("Close menu");

      fireEvent.click(menuButton);
      expect(nav).not.toHaveClass(styles.isOpen);
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(menuButton).toHaveAccessibleName("Open menu");
    });

    it("should close menu when navigation link is clicked", () => {
      renderWithRouter(<Header />);

      const menuButton = screen.getByLabelText("Open menu");
      fireEvent.click(menuButton);

      const homeLink = screen.getByText("Home");
      fireEvent.click(homeLink);

      const nav = screen.getByRole("navigation", { name: "Main" });
      expect(nav).not.toHaveClass(styles.isOpen);
    });
  });

  describe("Cart and Wishlist", () => {
    it("should display correct cart count", () => {
      renderWithRouter(<Header />);

      const cartCount = screen.getByLabelText("0 items in cart");
      expect(cartCount).toHaveTextContent("0");
    });

    it("should open cart modal when cart button is clicked", () => {
      renderWithRouter(<Header />);

      const cartButton = screen.getByLabelText("Shopping Cart");
      fireEvent.click(cartButton);

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByText("Cart Content")).toBeInTheDocument();
    });

    it("should open wishlist modal when wishlist button is clicked", () => {
      renderWithRouter(<Header />);

      const wishlistButton = screen.getByLabelText("Wishlist");
      fireEvent.click(wishlistButton);

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByText("Wishlist Content")).toBeInTheDocument();
    });

    it("should close modal when another modal is opened", () => {
      renderWithRouter(<Header />);

      // Open cart first
      fireEvent.click(screen.getByLabelText("Shopping Cart"));
      expect(screen.getByText("Cart Content")).toBeInTheDocument();

      // Open wishlist
      fireEvent.click(screen.getByLabelText("Wishlist"));
      expect(screen.getByText("Wishlist Content")).toBeInTheDocument();
      expect(screen.queryByText("Cart Content")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have correct ARIA labels and roles", () => {
      renderWithRouter(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "Main" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "User actions" })
      ).toBeInTheDocument();

      const cartButton = screen.getByLabelText("Shopping Cart");
      expect(cartButton).toHaveAttribute("aria-describedby", "cart-count");

      const cartCount = screen.getByLabelText("0 items in cart");
      expect(cartCount).toHaveAttribute("aria-live", "polite");
      expect(cartCount).toHaveAttribute("aria-atomic", "true");
    });
  });

  describe("Navigation Links", () => {
    it("should render navigation links with correct URLs", () => {
      renderWithRouter(<Header />);

      const homeLink = screen.getByText("Home");
      const productsLink = screen.getByText("Products");

      expect(homeLink).toHaveAttribute("href", "/");
      expect(productsLink).toHaveAttribute("href", "/products");
    });
  });
});
