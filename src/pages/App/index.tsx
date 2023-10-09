import Header from "../../component/Header";
import Button from "../../component/Button";
import SectionHeader from "../../component/SectionHeader";
import AccountList from "../../component/AccountList";
import AccountCard from "../../component/AccountCard";
import NoAccount from "../../component/NoAccount/index.tsx";
import TransactionTable from "../../component/TransactionTable";
import TransactionRegister from "../../component/TransactionRegister.tsx";
import Footer from "../../component/Footer/index.tsx";
import api from "../../api/index.ts";
import ModalAddAccount from "../../component/ModalAddAccount/index.tsx";
import ModalAddTransaction from "../../component/ModalAddTransaction";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Account, Transaction } from "../../types/index.ts";
import { useNavigate } from "react-router-dom";

function App() {
  const [transactions, setTransactions] = useState({
    transactions: [],
    modalVisible: false,
  });

  const [account, setAccount] = useState({
    accounts: [],
    modalVisible: false,
    edit: false,
  });

  const navigate = useNavigate();

  async function authUser() {
    const token = sessionStorage.getItem("token");
    if(!token) {
      navigate("/login");
    } else {
      const auth = await api.get("/auth")
      if(auth.status !== 200) {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    authUser();
  }) 

  useEffect(() => {
    api
      .get("/accounts")
      .then((response) =>
        setAccount((prev) => ({
          ...prev,
          accounts: response.data,
        }))
      )
      .catch(() => {
        navigate("/login")
      });
  }, [account.modalVisible, account.edit]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => {
        setTransactions((prev) => ({
          ...prev,
          transactions: response.data,
        }));
      })
      .catch(() => {
        navigate("/login");
      });
  }, [account, transactions.modalVisible, account.edit, account.modalVisible]);

  function modalAccountVisible() {
    setAccount((prev) => ({
      ...prev,
      modalVisible: !prev.modalVisible,
    }));
  }

  function modalTransactionVisible() {
    setTransactions((prev) => ({
      ...prev,
      modalVisible: !prev.modalVisible,
    }));
  }

  function accountEdit() {
    setAccount((prev) => ({ ...prev, edit: !prev.edit }));
  }


  const accountsList = account.accounts?.map((account: Account) => {
    const value = transactions.transactions.reduce(
      (acc, transaction: Transaction) => {
        if(transaction.account.name === account.name) {
          return transaction.category.type === "Ganhos"
            ? acc + transaction.value
            : acc - transaction.value;
        }
        return acc}, 0
    );

    return (
      <AccountCard
        key={account.id}
        id={account.id}
        title={account.name}
        value={value}
        edit={accountEdit}
      />
    );
  });

  const transactionsList = transactions.transactions.map(
    (transaction: Transaction) => {
      return (
        <TransactionRegister
          accounts={account.accounts}
          key={transaction.id}
          transaction={transaction}
        />
      );
    }
  );

  return (
    <>
      <Header />
      <SectionHeader.Container>
        <SectionHeader.Title text="Minhas Contas" />
        <Button
          icon={AiOutlinePlus}
          text="Conta"
          handleClick={modalAccountVisible}
        />
      </SectionHeader.Container>
      <AccountList>
        {accountsList.length > 0 ? accountsList : <NoAccount />}
      </AccountList>
      <SectionHeader.Container>
        <SectionHeader.Title text="Minas Transações" />
        <Button
          text="Transação"
          icon={AiOutlinePlus}
          handleClick={modalTransactionVisible}
        />
      </SectionHeader.Container>
      <TransactionTable>{transactionsList}</TransactionTable>
      <Footer />

      <ModalAddAccount
        visible={account.modalVisible}
        handleClick={modalAccountVisible}
      />
      <ModalAddTransaction
        handleClick={modalTransactionVisible}
        accounts={account.accounts}
        visible={transactions.modalVisible}
      />
    </>
  );
}

export default App;
