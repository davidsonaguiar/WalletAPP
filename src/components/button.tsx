import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

function Button({ variant = "primary", ...rest }: ButtonProps) {

  const variants = {
    primary: "bg-indigo-700 text-zinc-200 hover:bg-indigo-600 hover:text-zinc-50",
    secondary: "bg-zinc-900 border border-zinc-500 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
  }

  return(
    <button {...rest} className={`w-full h-12 font-bold tracking-wider ${variants[variant]}`}>
      {rest.children}
    </button>
  );
}


export default Button;