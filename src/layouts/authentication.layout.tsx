import { ReactNode } from "react";
import { useAuthentication } from "../hooks/useAuhentication";
import { useNavigate } from "react-router-dom";

export function ProtectLayout(props: { children: ReactNode }) {

  const { isAuthenticaded } = useAuthentication();
  const navigation = useNavigate();

  if(!isAuthenticaded) navigation("/");

  return(
    <>
      { props.children }
    </>
  );
}