import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {

  return(
    <header className="w-full h-16 bg-zinc-900 border-b border-zinc-500 flex justify-between items-center">
      <h1 className="h-12 pl-6 text-zinc-300 text-4xl font-bold tracking-wider flex items-center">
        Wallet Web
      </h1>
      <nav className="h-full bg-zinc-900">
        <menu className="h-full text-zinc-300 flex justify-center items-center">
          {children}	
        </menu>
      </nav>
    </header>
  );

}