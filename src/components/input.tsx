import { InputHTMLAttributes } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: Path<any>;
  register?: UseFormRegister<any>;
}

export function Input({ 
  label,
  register,
  required,
  className,
  ...rest
}: InputProps) {

  const reg = register && label ? register(label, { required: required }) : undefined;

  return (
    <input
      required={required}
      {...rest}
      {...reg }
      className={`w-full h-12 px-3 border-y border-y-zinc-500 bg-zinc-800 text-zinc-200 ${className}`}
    />
  );
}
