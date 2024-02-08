import { Outlet } from "react-router-dom";
import {Header} from "../components/header";
import { LinkNavigation } from "../components/link.navigation";

export function DashboadLayout() {
  return(
    <>
      <Header>
        <LinkNavigation to="/dashboard" label="Início"/>
      </Header>
      <main className="w-full h-screen bg-zinc-800 text-zinc-300">
        <Outlet />
      </main>
    </>
  );
}
