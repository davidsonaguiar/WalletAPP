import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({children, ...rest}: LabelProps) {
  return(
    <label {...rest} className="w-full h-12 px-3 bg-zinc-900 text-zinc-300 flex items-center ">
      {children}
    </label>
  );
}