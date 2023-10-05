import Header from "../../component/Header";
import Button from "../../component/Button";
import SectionHeader from "../../component/SectionHeader";
import AccountList from "../../component/AccountList";
import AccountCard from "../../component/AccountCard";
import NoAccount from "../../component/NoAccount/index.tsx";
import TransactionTable from "../../component/TransactionTable";
import TransactionRegister from "../../component/TransactionRegister.tsx";
import Footer from "../../component/Footer/index.tsx";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import api from "../../api/index.ts";
import ModalAddAccount from "../../component/ModalAddAccount/index.tsx";

type Account = {
  id: string;
  name: string;
  user_id?: string;
}

type Category = {
  id: number;
  name: string;
  type: "ganhos" | "Gastos";
}

type Transaction = {
  id: string;
  value: number;
  date: string;
  description: string;
  account: Account;
  category: Category;
}

function App() {
  
  const [ account, setAccount ]= useState({
    accounts: [],
    modalVisible: false,
    edit: false
  });

  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/accounts")
      .then((response) => setAccount((prev) => ({...prev, accounts: response.data})))
      .catch((error) => console.log(error));
  }, [account.modalVisible, account.edit])

  useEffect(() => {
    api.get("/transactions")
      .then((response) => {
        console.log(response.data)
        setTransactions(response.data)
      })
      .catch((error) => console.log(error));
  }, [account])


  function modalAccountVisible() {
    console.log(account.modalVisible)
    setAccount((prev) => ({
      ...prev, 
      modalVisible: !prev.modalVisible
    }))
  }

  function accountEdit() {
    setAccount((prev) => ({...prev, edit: !prev.edit}));
  }

  const accountsList = account.accounts?.map((account: Account) => {
    const value = transactions.reduce((acc, transaction) => 
      transaction.account.name === account.name
        ? acc + transaction.value
        : acc, 0)
      return(
        <AccountCard 
          key={account.id} 
          id={account.id} 
          title={account.name} 
          value={value}
          edit={accountEdit}
        />
      );
  });

  const transactionsList = transactions.map((transaction) => {
    return <TransactionRegister 
      key={transaction.id}
      name={transaction.account.name}
      value={transaction.value}
      category={transaction.category.name}
      date={transaction.date}
      description={transaction.description}
    />;
  });

  return (
    <>
      <Header />
      <SectionHeader.Container>
        <SectionHeader.Title text="Minhas Contas" />
        <Button icon={AiOutlinePlus} text="Conta" handleClick={modalAccountVisible}/>
      </SectionHeader.Container>
      <AccountList>
        { accountsList.length > 0 ? accountsList : <NoAccount /> }
      </AccountList>
      <SectionHeader.Container>
        <SectionHeader.Title text="Minas Transações" />
        <Button text="Transação" icon={AiOutlinePlus} handleClick={console.log}/>
      </SectionHeader.Container>
      <TransactionTable>
        {transactionsList}
      </TransactionTable>
      <Footer />

      { 
        account.modalVisible && 
        <ModalAddAccount 
          visible={account.modalVisible} 
          handleClick={modalAccountVisible}
        /> 
      }

    </>
  )
}

export default App;