import { ButtonColors, ButtonProps } from "../../types/Button";

import styles from "../../styles/css/components/ui/Button.module.css";

const Button = ({
  children,
  isSuccess,
  color = ButtonColors.Light,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isSuccess ? styles.success : ""} ${
        styles[color]
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
