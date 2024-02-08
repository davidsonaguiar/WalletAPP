import { useEffect, useState } from "react";
import { AccountCard } from "../components/account.card";
import { useAuthentication } from "../hooks/useAuhentication";
import axios from "../axios";
import { ForEach } from "../components/for.each";
import { AccountEntity } from "../models/account.model";

function Home() {

  const { user, isLoading } = useAuthentication();
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);

  async function getAccounts(email: string) {
    const response = await axios.get(`accounts/${email}`);
    if(response.status === 200) {
      setAccounts(response.data);
    }
  }

  useEffect(() => {
    if(user && !isLoading) {
      getAccounts(user.email);
    }
  }, [user, isLoading]);

  const accountsWithAmount = accounts.map(account => {
    const amount = account.transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return {
      id: account.id,
      name: account.name,
      amount
    }
  });

  console.log(accountsWithAmount)

  return (
    <>
      <div className="w-full max-w-xs h-full bg-zinc-900 border-r border-zinc-500 flex flex-col">
        <h2 className="w-full h-14 pl-6 border-b border-zinc-500 text-lg font-medium uppercase flex items-center">
          Contas
        </h2>
        <ul className="w-full h-full p-3  flex flex-col gap-3">
          <ForEach items={accountsWithAmount} render={AccountCard} />
        </ul>
      </div>
    </>
  );
}

export default Home;
