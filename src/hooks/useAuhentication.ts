import { useContext } from "react";
import { AuthenticationContext } from "../context/authentication.context";

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "AuthenticationContext must be used within an AuthenticationProvider"
    );
  }
  return context;
}