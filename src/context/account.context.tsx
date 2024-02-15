import { createContext, useState } from "react";
import { useAuthentication } from "../hooks/useAuhentication";
import api from "../axios";
import { toast } from "sonner";
import { CreateAccountRequest } from "../models/account.model";

interface AccountContextProps {
  isCreate: boolean;
  setIsCreate: (isCreate: boolean) => void;
  createAccount: (input: CreateAccountRequest) => Promise<void>;
}

export const AccountContext = createContext<AccountContextProps | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [isCreate, setIsCreate] = useState(false);
  const { user } = useAuthentication();

  async function createAccount(input: CreateAccountRequest) {
    const { name, amount } = input;
    try{
      const response = await api.post(`accounts/${user?.email}`, {
        name,
        amount,
      })

      if(response.status === 201){
        setIsCreate(false);
        toast.success(`Conta ${name} criada com sucesso`);
      }
    }
    catch(error){
      toast.error("Erro ao criar conta");
    }
  }

  return (
    <AccountContext.Provider value={{ isCreate, setIsCreate, createAccount }}>
      {children}
    </AccountContext.Provider>
  );
}