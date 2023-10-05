import { ElementType } from "react";

interface ButtonProps {
  text: string;
  handleClick: () => void;
  variant?: "default" | "confirm" | "delete";
  icon: ElementType;
}

function Button({ icon: Icon, text, variant = "default", handleClick }: ButtonProps) {
  return(
    <button className={`button ${variant}`} onClick={handleClick}>
      <Icon />
      { text }
    </button>
  );
}

export default Button;