import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../utils/testUtils";
import ErrorPage from "../ErrorPage";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ErrorPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders default error message when no error provided", () => {
    renderWithRouter(<ErrorPage />);

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Error details")).not.toBeInTheDocument();
  });

  it("renders specific error message when error provided", () => {
    const testError = new Error("Test error message");
    renderWithRouter(<ErrorPage error={testError} />);

    expect(screen.getByLabelText("Error details")).toHaveTextContent(
      "Test error message"
    );
  });

  it("navigates back when Go Back button is clicked", () => {
    renderWithRouter(<ErrorPage />);

    const backButton = screen.getByRole("button", {
      name: "Go back to previous page",
    });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("navigates to home when Go Home button is clicked", () => {
    renderWithRouter(<ErrorPage />);

    const homeButton = screen.getByRole("button", {
      name: "Return to homepage",
    });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders navigation buttons with correct labels", () => {
    renderWithRouter(<ErrorPage />);

    expect(
      screen.getByLabelText("Go back to previous page")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Return to homepage")).toBeInTheDocument();
  });
});
