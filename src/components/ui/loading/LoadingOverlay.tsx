import LoadingSpinner from "./LoadingSpinner";

import styles from "../../../styles/css/components/ui/loading/LoadingOverlay.module.css";

const LoadingOverlay = ({ ...props }) => {
  return (
    <div className={styles.overlay} role="status" {...props}>
      <LoadingSpinner size="large" />
    </div>
  );
};

export default LoadingOverlay;
