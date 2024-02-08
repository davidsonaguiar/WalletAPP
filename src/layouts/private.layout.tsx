import { ReactNode, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuhentication";
import { useNavigate } from "react-router-dom";

export function PrivateLayout(props: { children: ReactNode }) {

  const { isAuthenticaded, isLoading } = useAuthentication();
  const navigation = useNavigate();

  useEffect(() => {
    if(!isAuthenticaded && !isLoading) navigation("/");
  }, [isAuthenticaded, isLoading])

  return(
    <>
      { props.children }
    </>
  );
}