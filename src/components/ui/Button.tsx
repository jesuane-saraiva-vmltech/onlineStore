import styles from "../../styles/css/components/ui/Button.module.css";
import { ButtonProps } from "../../types/Button";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
