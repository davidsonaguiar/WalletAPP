import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header";
import { LinkNavigation } from "../components/link.navigation";

export function PublicLayout() {

  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header>
        {
          location.pathname === "/register" ? (
            <LinkNavigation to="/" variant="primary" label="Entrar" />
          ) : (
            <LinkNavigation to="/register" variant="primary" label="Registre-se"/>
          )
        }
      </Header>
      <main className="h-screen bg-zinc-800 flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}
