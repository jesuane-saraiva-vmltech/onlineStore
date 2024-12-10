import styles from "../../styles/css/components/ui/Button.module.css";
import { ButtonProps } from "../../types/Button";

const Button = ({ children, isSuccess, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isSuccess ? styles.success : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
