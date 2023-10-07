import ModalEditTransaction from "../ModalEditTransaction";
import { AiOutlineEdit } from "react-icons/ai";
import { Account, Transaction } from "../../types";
import { useState } from "react";

interface TransactionRegisterProps {
  transaction: Transaction;
  accounts: Account[];
}

function TransactionRegister({transaction, accounts}: TransactionRegisterProps) {

  const [ edit, setEdit ] = useState<boolean>(false);

  function handleEdit() {
    setEdit(!edit);
  }

  return (
    <>
      <tr className="transaction-register-container">
        <td>{transaction.account.name}</td>
        <td>
          {
            transaction.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }
        </td>
        <td>{transaction.category.name}</td>
        <td>{new Date(transaction.date).toLocaleDateString()}</td>
        <td>{transaction.description}</td>
        <td>
          <button className="transaction-register-edit" onClick={handleEdit}>
            <AiOutlineEdit size={20}/>
          </button>
        </td>
      </tr>
      <ModalEditTransaction
        accounts={accounts}
        transaction={transaction}
        handleClick={handleEdit}
        visible={edit}
      />
    </>
  );
}

export default TransactionRegister;
