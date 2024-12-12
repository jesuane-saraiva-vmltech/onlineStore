import styles from "../../../styles/css/components/ui/loading/LoadingSpinner.module.css";
import {
  LoadingSpinnerProps,
  LoadingSpinnerSize,
} from "../../../types/LoadingSpinner";

const LoadingSpinner = ({
  size = LoadingSpinnerSize.large,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]}`}
      role="progressbar"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
