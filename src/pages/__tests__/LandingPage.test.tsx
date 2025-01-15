import { screen } from "@testing-library/react";

import LandingPage from "../LandingPage";

import { renderWithRouter } from "../../utils/testUtils";

describe("LandingPage", () => {
  it("renders main heading", () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText("Discover Your Perfect Gift")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    renderWithRouter(<LandingPage />);
    expect(
      screen.getByText("What makes gifting special? YOU do!")
    ).toBeInTheDocument();
  });

  it("renders explore collection link", () => {
    renderWithRouter(<LandingPage />);
    const link = screen.getByRole("link", { name: "Explore Collection" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/products");
  });
});
