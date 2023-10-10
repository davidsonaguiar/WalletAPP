import { ButtonHTMLAttributes, ElementType } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  handleClick?: () => void;
  variant?: "default" | "confirm" | "delete";
  icon: ElementType;
}

function Button({ icon: Icon, text, variant = "default", handleClick, ...rest }: ButtonProps) {
  return(
    <button {...rest} className={`button ${variant}`} onClick={handleClick}>
      <Icon />
      { text }
    </button>
  );
}

export default Button;