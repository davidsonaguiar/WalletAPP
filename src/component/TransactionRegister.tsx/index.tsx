interface TransactionRegisterProps {
  name: string;
  value: number;
  category: string;
  date: string;
  description: string;
}

function TransactionRegister(props: TransactionRegisterProps) {
  return(
    <tr className="transaction-register-container">
      <td>{props.name}</td>
      <td>R$ {props.value}</td>
      <td>{props.category}</td>
      <td>{props.date}</td>
      <td>{props.description}</td>
    </tr>
  );
}

export default TransactionRegister;