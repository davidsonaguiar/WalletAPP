import { ReactNode, createContext, useEffect, useState } from "react";
import { UserWhithoutPassword } from "../models/user.model";
import api  from "../axios.instance";

interface AuthenticationContextProps {
  isAuthenticaded: boolean;
  user: UserWhithoutPassword | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | null>(
  null
);

export function AuthenticationProvider(props: { children: ReactNode }) {

  const [ user, setUser ] = useState<UserWhithoutPassword | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const storagedUser = localStorage.getItem("user");
    if (storagedUser) setUser(JSON.parse(storagedUser));
  }, [])

  function setUserStorage(user: UserWhithoutPassword | null) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeUserStorage() {
    localStorage.removeItem("user");
  }
  
  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await api(
        "login",
        {
          method: "POST",
          data: {
            email,
            password
          },
          withCredentials: true
        }
      );
      setUserStorage(response.data);
      setUser(response.data);
    } catch(error) {
      console.log(error);
    }
    setIsLoading(false)
  }
  
  function signOut() {
    setUser(null);
    removeUserStorage();
  }

  return (
    <AuthenticationContext.Provider value={{isAuthenticaded: !!user, user, isLoading, signIn, signOut}}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}