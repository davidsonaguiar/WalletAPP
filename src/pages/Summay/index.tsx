import SectionHeader from "../../component/SectionHeader";
import NoAccount from "../../component/NoAccount";
import api from "../../api";
import Button from "../../component/Button";
import Papa from "papaparse";
import { BiExport } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Category, Transaction } from "../../types";

function Summary() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<string>("all");

  async function getTransactions() {
    const responseTransaction = await api.get("/transactions");

    if (responseTransaction.status === 200) {
      const dataTransaction: Transaction[] = await responseTransaction.data;
      setTransactions(dataTransaction);
    } else {
      console.log("Error", responseTransaction.statusText);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const uniqueMonths = new Set<string>();
  const transactionsByCategory: {
    category: Category;
    transactions: Transaction[];
    total: number;
  }[] = [];

  const filteredTransactionsByMonth: {
    category: Category;
    transactions: Transaction[];
    total: number;
  }[] = [];

  transactions.forEach((transaction) => {
    const category = transaction.category;

    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    uniqueMonths.add(monthYear);

    const existingCategory = transactionsByCategory.find(
      (item) => item.category.id === category.id
    );

    if (existingCategory) {
        existingCategory.transactions.push(transaction);
        existingCategory.total += transaction.value;
    } else {
      transactionsByCategory.push({
        category,
        transactions: [transaction],
        total: transaction.value,
      });
    }
  })
  
  transactionsByCategory.forEach((categoryItem) => {
    const filteredTransactions = month === 'all'
      ? categoryItem.transactions
      : categoryItem.transactions.filter((transaction) => {
          const date = new Date(transaction.date);
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          return monthYear === month;
        });
  
    const total = filteredTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
  
    if (filteredTransactions.length > 0) {
      filteredTransactionsByMonth.push({
        category: categoryItem.category,
        transactions: filteredTransactions,
        total,
      });
    }
  });


  const registerList = filteredTransactionsByMonth.map((transaction) => (
    <tr className="transaction-register-container" key={transaction.category.id}>
      <td>{transaction.category.name}</td>
      <td>{transaction.category.type}</td>
      <td>{transaction.transactions.length}</td>
      <td>
        {transaction.total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
    </tr>
  ));

  const options = [...uniqueMonths].map((option) => (
    <option value={option}>{option}</option>
  ));

  function generateCSV() {
    const csvData = filteredTransactionsByMonth.map((categoryData) => {
      const category = categoryData.category.name;
      const type = categoryData.category.type;
      const numTransactions = categoryData.transactions.length;
      const total = categoryData.total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return { Categoria: category, Tipo: type, "Nº de Transações": numTransactions, Total: total };
    });
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], { type: "text/csv;charset=utf-8"});  
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "transactions.csv";
  
    document.body.appendChild(a);
    a.click();
  
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }

  return (
    <div className="summary">
      <SectionHeader.Container>
        <SectionHeader.Title text="Resumo Financeiro" />
        <label htmlFor="month" className="label-month">
          Por mês:{" "}
        </label>
        <select
          id="month"
          defaultValue="all"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          className="select-month"
        > 
          <option value="all">TODOS</option>
          {options}
        </select>
        <Button icon={BiExport} text="EXPORT" handleClick={generateCSV}/>
      </ SectionHeader.Container>
      <table className="transaction-table-container">
        <thead>
          <tr className="transaction-table-header">
            <th className="transaction-table-header-col">CATEGORIA</th>
            <th className="transaction-table-header-col">TIPO</th>
            <th className="transaction-table-header-col">Nº TRANSAÇÕE</th>
            <th className="transaction-table-header-col">TOTAL</th>
          </tr>
        </thead>
        <tbody className="transaction-table-body"></tbody>
      </table>
      {transactions.length > 0 ? (
        registerList
      ) : (
        <NoAccount
          title="Não Transações"
          text="Cadastre transações para poder realizar o acompanhamento."
        />
      )}
    </div>
  );
}

export default Summary;
