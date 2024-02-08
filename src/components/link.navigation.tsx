import { Link } from "react-router-dom";

interface LinkNavigationProps {
  to: string;
  label: string;
  variant?: "primary" | "secondary";
}

export function LinkNavigation({
  to,
  label,
  variant = "primary",
}: LinkNavigationProps) {
  const variants = {
    primary: "bg-zinc-900 hover:bg-zinc-800",
    secondary: "bg-indigo-700 hover:bg-indigo-600",
  };

  return (
    <li className="h-full">
      <Link
        to={to}
        className={`h-full px-6 ${variants[variant]} border-l border-zinc-500 font-medium tracking-widest uppercase flex items-center`}
      >
        {label}
      </Link>
    </li>
  );
}
