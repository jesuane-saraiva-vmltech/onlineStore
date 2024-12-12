import LoadingSpinner from "./LoadingSpinner";
import styles from "../../../styles/css/components/ui/loading/LoadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay} role="status">
      <LoadingSpinner size="large" />
    </div>
  );
};

export default LoadingOverlay;
