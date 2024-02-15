import { useEffect, useState } from "react";
import { AccountCard } from "../components/account.card";
import { useAuthentication } from "../hooks/useAuhentication";
import axios from "../axios";
import { ForEach } from "../components/for.each";
import { AccountEntity } from "../models/account.model";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../hooks/useAccountContext";
import { DialogAddAccount } from "../components/dialog.add.account";
import { Hidden } from "../components/hidden";
import { Toaster } from "sonner";

function Home() {
  const { user, isLoading } = useAuthentication();
  const { isCreate, setIsCreate } = useAccountContext();
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);

  const navigation = useNavigate();

  async function getAccounts(email: string) {
    try {
      const response = await axios.get(`accounts/${email}`);
      setAccounts(response.data);
    } catch (error) {
      navigation("/");
    }
  }

  useEffect(() => {
    if (user && !isLoading) {
      getAccounts(user.email);
    }
  }, [user, isLoading]);

  const accountsWithAmount = accounts.map((account) => {
    const amount = account.transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return {
      id: account.id,
      name: account.name,
      amount,
    };
  });

  return (
    <>
      <div className="w-full max-w-xs h-full bg-zinc-900 border-r border-zinc-500 flex flex-col">
        <div className="w-full h-14 border-b border-zinc-500 flex items-center justify-between">
          <h2 className=" pl-6 text-lg font-medium uppercase">Contas</h2>
          <button
            className="h-full px-6 border-l border-zinc-500 hover:bg-zinc-800"
            onClick={() => setIsCreate(true)}
          >
            +
          </button>
        </div>
        <ul className="w-full h-full p-3  flex flex-col gap-3">
          <ForEach items={accountsWithAmount} render={AccountCard} />
        </ul>
      </div>
      <Hidden isHidden={!isCreate} element={<DialogAddAccount />} />
      <Toaster position="top-right" duration={5000} />
    </>
  );
}

export default Home;
