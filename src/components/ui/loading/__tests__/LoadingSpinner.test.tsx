import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";
import { LoadingSpinnerSize } from "../../../../types/LoadingSpinner";
import styles from "../../../styles/css/components/ui/loading/LoadingSpinner.module.css";

describe("LoadingSpinner", () => {
  it("should have default large size when no size prop is provided", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass(styles.spinner, styles.large);
  });

  it("should apply small size class when size is small", () => {
    render(<LoadingSpinner size={LoadingSpinnerSize.small} />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass(styles.spinner, styles.small);
  });

  it("should apply medium size class when size is medium", () => {
    render(<LoadingSpinner size={LoadingSpinnerSize.medium} />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass(styles.spinner, styles.medium);
  });

  it("should apply large size class when size is large", () => {
    render(<LoadingSpinner size={LoadingSpinnerSize.large} />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass(styles.spinner, styles.large);
  });

  it("should render with correct ARIA attributes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });
});
