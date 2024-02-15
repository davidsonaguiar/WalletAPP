import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  width?: "full" | "content";
}

function Button({ variant = "primary", width = "full", ...rest }: ButtonProps) {

  const variants = {
    primary: "bg-indigo-700 text-zinc-200 hover:bg-indigo-600 hover:text-zinc-50",
    secondary: "bg-zinc-900 border border-zinc-500 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
  }

  const widths = {
    full: "w-full",
    content: "w-content"
  }

  return(
    <button {...rest} className={`${widths[width]} h-full min-h-12 px-6 font-bold tracking-wider ${variants[variant]}`}>
      {rest.children}
    </button>
  );
}


export default Button;