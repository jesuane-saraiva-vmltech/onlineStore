import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";
import { ButtonColors } from "../../../types/Button";

// Mock the CSS modules
jest.mock("../../styles/css/components/ui/Button.module.css", () => ({
  button: "button",
  success: "success",
  light: "light",
  dark: "dark",
}));

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  it("applies default light color class when no color prop is provided", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("light");
  });

  it("applies dark color class when dark color prop is provided", () => {
    render(<Button color={ButtonColors.Dark}>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("dark");
  });

  it("applies success class when isSuccess prop is true", () => {
    render(<Button isSuccess>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("success");
  });

  it("does not apply success class when isSuccess prop is false", () => {
    render(<Button isSuccess={false}>Click me</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("success");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("spreads additional props to button element", () => {
    render(
      <Button data-testid="custom-button" disabled>
        Click me
      </Button>
    );
    const button = screen.getByTestId("custom-button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-testid", "custom-button");
  });
});
