import { HTMLProps } from "react";

interface FormProps extends HTMLProps<HTMLFormElement> {}

export function Form({children, className, ...rest}: FormProps) {
  return (
    <form {...rest} className={`bg-zinc-900 border-x border-x-zinc-500  ${className}`}>
      {children}
    </form>
  );
}