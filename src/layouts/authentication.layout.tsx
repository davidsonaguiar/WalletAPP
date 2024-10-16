import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectLayout(props: { children: ReactNode }) {
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigation("/login");
    }
  })

  return(
    <>
      { props.children }
    </>
  );
}