import { ReactNode, createContext, useEffect, useState } from "react";
import {
  AuthenticateRequest,
  RegisterRequest,
  UserWhithoutPassword,
} from "../models/user.model";
import api from "../axios";

import { toast } from "sonner";
import { AxiosError } from "axios";

interface AuthenticationContextProps {
  isAuthenticaded: boolean;
  user: UserWhithoutPassword | null;
  isLoading: boolean;
  signUp: (input: RegisterRequest) => Promise<void>;
  signIn: (input: AuthenticateRequest) => Promise<void>;
  signOut: () => void;
}

export const AuthenticationContext =
  createContext<AuthenticationContextProps | null>(null);

export function AuthenticationProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<UserWhithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem("user");
    if (storagedUser) setUser(JSON.parse(storagedUser));
    setIsLoading(false);
  }, []);

  function setUserStorage(user: UserWhithoutPassword | null) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeUserStorage() {
    localStorage.removeItem("user");
  }

  async function signUp(input: RegisterRequest) {
    setIsLoading(true);
    console.log(input);
    try {
      const response = await api("register", {
        method: "POST",
        data: input,
      });
      setUserStorage(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 500) {
          toast.error(error.response?.data);
        } else {
          toast.error("Erro ao realizar cadastro");
        }
      }
    }
    setIsLoading(false);
  }

  async function signIn(input: AuthenticateRequest) {
    setIsLoading(true);
    try {
      const response = await api("login", {
        method: "POST",
        data: input,
        withCredentials: true,
      });
      setUserStorage(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log(error.response.data);
          toast.error(error.response.data);
        } else {
          toast.error("Erro ao realizar login");
        }
      }
    }
    setIsLoading(false);
  }

  function signOut() {
    setUser(null);
    removeUserStorage();
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticaded: !!user,
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
}
