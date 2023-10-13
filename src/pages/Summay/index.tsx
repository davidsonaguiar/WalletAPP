import AccountList from "../../component/AccountList";
import SectionHeader from "../../component/SectionHeader";
import { useState, useEffect } from "react";
import { Transaction } from "../../types";
import api from "../../api";
import TransactionCard from "../../component/TransactionCard.tsx";
import NoAccount from "../../component/NoAccount/index.tsx";

function Summary() {

  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  async function getTransactions() {

    const responseTransaction = await api.get("/transactions");

    if(responseTransaction.status === 200 ) {
      const dataTransaction: Transaction[] = await responseTransaction.data;
      setTransactions(dataTransaction);
    } else {
      console.log("Error", responseTransaction.statusText);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [])

  const monthlySummary: { month: string; gasto: number; ganho: number }[] = [];

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const value = transaction.value;

    if (transaction.category.type === "Ganhos") {
      const existingMonth = monthlySummary.find((item) => item.month === monthYear);
      if (existingMonth) {
        existingMonth.ganho += value;
      } else {
        monthlySummary.push({ month: monthYear, gasto: 0, ganho: value });
      }
    } else {
      const existingMonth = monthlySummary.find((item) => item.month === monthYear);
      if (existingMonth) {
        existingMonth.gasto += value;
      } else {
        monthlySummary.push({ month: monthYear, gasto: value, ganho: 0 });
      }
    }
  });


  const listCard = monthlySummary.map((item) => {
    return(
      <TransactionCard key={item.month} mes={item.month} earnings={item.ganho} expenses={item.gasto}/>
    )
  })

  return(
    <div>
      <SectionHeader.Container>
        <SectionHeader.Title text="Resumo Mensal" />
      </SectionHeader.Container>
      <AccountList>
        {
          transactions.length > 0 
          ? listCard
          : <NoAccount title="Não Transações" text="Cadastre transações para poder realizar o acompanhamento."/>
        }
      </AccountList>
      <SectionHeader.Container>
        <SectionHeader.Title text="Resumo por Categoria" />
      </SectionHeader.Container>
    </div>
  );
}

export default Summary;