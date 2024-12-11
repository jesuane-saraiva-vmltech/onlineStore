export enum ButtonColors {
  Light = "light",
  Dark = "dark",
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isSuccess?: boolean;
  color?: ButtonColors;
};
