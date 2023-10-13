interface TransactionCardProps {
  mes: string;
  earnings: number;
  expenses: number;
}

function TransactionCard({ earnings, expenses, mes }: TransactionCardProps) {

  function normalize(num: number) {
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <li className="account-card-container">
      <span className="account-card-header">
        <span className="account-card-header-title">{mes}</span>
      </span>
      <span className="transaction-card-value">
        Ganhei: { normalize(earnings) }
      </span>
      <span className="transaction-card-value">
        Gastei:  {normalize(expenses)}
      </span>
    </li>          
  )
}

export default TransactionCard;