import Button from "../../component/Button/index.tsx";
import SectionHeader from "../../component/SectionHeader/index.tsx";
import AccountList from "../../component/AccountList/index.tsx";
import AccountCard from "../../component/AccountCard/index.tsx";
import NoAccount from "../../component/NoAccount/index.tsx";
import TransactionTable from "../../component/TransactionTable/index.tsx";
import TransactionRegister from "../../component/TransactionRegister.tsx/index.tsx";
import api from "../../api/index.ts";
import ModalAddAccount from "../../component/ModalAddAccount/index.tsx";
import ModalAddTransaction from "../../component/ModalAddTransaction/index.tsx";
import ModalEditTransaction from "../../component/ModalEditTransaction/index.tsx";
import ModadAddCategory from "../../component/ModalAddCategory/index.tsx";
import ModalImportTransaction from "../../component/ModalImportTransaction/index.tsx";
import { useEffect, useState, FormEvent } from "react";
import { AiOutlineImport, AiOutlinePlus } from "react-icons/ai";
import { Account, Transaction } from "../../types/index.ts";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

type AccountList = {
  id: string;
  name: string;
  value: number;
};

type StateType = {
  accounts: AccountList[];
  transactions: Transaction[];
  import: boolean;
  addAccount: boolean;
  addCategory: boolean;
  editAccount: boolean;
  addTransaction: boolean;
  editTransaction: {
    open: boolean;
    transaction?: Transaction;
  };
};

const initialState = {
  accounts: [],
  transactions: [],
  import: false,
  addAccount: false,
  addCategory: false,
  editAccount: false,
  addTransaction: false,
  editTransaction: {
    open: false,
    transaction: undefined,
  },
};

function Home() {
  const [state, setState] = useState<StateType>(initialState);

  const navigate = useNavigate();

  async function authUser() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    } else {
      const auth = await api.get("/auth")
      if(auth.status !== 200) {
        navigate("/login");
        return false;
      } else {
        return true;
      }
    }
  }

  async function getTransactions() {
    const responseTransaction = await api.get("/transactions");
    const responseAccount = await api.get("/accounts");

    if (responseTransaction.status === 200 && responseAccount.status === 200) {
      const dataAccount = await responseAccount.data;
      const dataTransaction: Transaction[] = await responseTransaction.data;
      const accounts: AccountList[] = dataAccount.map((account: Account) => {
        const accountValue = dataTransaction.reduce(
          (acc: number, transaction: Transaction) => {
            if (transaction.account.name === account.name) {
              return transaction.category.type === "Ganhos"
                ? acc + transaction.value
                : acc - transaction.value;
            } else {
              return acc;
            }
          },
          0
        );
        return { ...account, value: accountValue };
      });

      setState((prev) => ({
        ...prev,
        transactions: dataTransaction,
        accounts,
      }));
    } else {
      console.log("Error", responseTransaction.statusText);
    }
  }

  function addAccount(event?: FormEvent) {
    event && event.preventDefault();
    setState((prev) => ({
      ...prev,
      addAccount: !prev.addAccount,
    }));
  }

  function editAccount(status: boolean) {
    setState((prev) => ({
      ...prev,
      editAccount: status,
    }));
  }

  function addTransaction(event?: FormEvent) {
    event && event.preventDefault();
    setState((prev) => ({
      ...prev,
      addTransaction: !prev.addTransaction,
    }));
  }

  function editTransaction(
    open: boolean,
    transaction?: Transaction,
    event?: FormEvent
  ) {
    event && event.preventDefault();
    setState((prev) => ({
      ...prev,
      editTransaction: {
        open,
        transaction,
      },
    }));
  }

  function addCategory(event?: FormEvent) {
    event && event.preventDefault();
    setState((prev) => ({
      ...prev,
      addCategory: !prev.addCategory,
    }));
  }

  function importTransaction(event?: FormEvent) {
    event && event.preventDefault();
    setState((prev) => ({
      ...prev,
      import: !prev.import,
    }));
  }

  useEffect(() => {
    async function authentication() {
      const logged = await authUser()
      logged && getTransactions();
    }
    authentication();
  }, [
    state.editAccount,
    state.addAccount,
    state.editTransaction,
    state.addTransaction,
    state.addCategory,
    state.import,
  ]);

  return (
    <>
      <SectionHeader.Container>
        <SectionHeader.Title text="Minhas Contas" />
        <Button text="Conta" icon={AiOutlinePlus} handleClick={addAccount} />
      </SectionHeader.Container>
      <AccountList>
        {state.accounts.length > 0 ? (
          state.accounts.map((account) => (
            <AccountCard
              edit={editAccount}
              key={account.id}
              id={account.id}
              title={account.name}
              value={account.value}
            />
          ))
        ) : (
          <NoAccount
            title="Não há conta cadastrada"
            text="Cadastre uma nova conta para iniciar seu controle de finanças"
          />
        )}
      </AccountList>
      <SectionHeader.Container>
        <SectionHeader.Title text="Minhas Transações" />
        <div className="section-header-buttons">
          <Button
            text="Importar"
            icon={AiOutlineImport}
            handleClick={importTransaction}
          />
          <Button
            text="Categorias"
            icon={BiCategory}
            handleClick={addCategory}
          />
          <Button
            text="Transação"
            icon={AiOutlinePlus}
            handleClick={addTransaction}
          />
        </div>
      </SectionHeader.Container>
      <TransactionTable>
        {state.transactions.map((transaction) => (
          <TransactionRegister
            key={transaction.id}
            transaction={transaction}
            handleClick={editTransaction}
          />
        ))}
      </TransactionTable>
      <ModadAddCategory visible={state.addCategory} handleClick={addCategory} />
      <ModalAddAccount visible={state.addAccount} handleClick={addAccount} />
      <ModalAddTransaction
        visible={state.addTransaction}
        accounts={state.accounts}
        handleClick={addTransaction}
      />
      <ModalImportTransaction
        visible={state.import}
        accounts={state.accounts}
        changeModal={importTransaction}
      />
      {state.editTransaction.transaction && (
        <ModalEditTransaction
          accounts={state.accounts}
          transaction={state.editTransaction.transaction}
          handleClick={editTransaction}
          visible={state.editTransaction.open}
        />
      )}
    </>
  );
}

export default Home;
