import { ReactNode } from "react";

interface TransactionTableProps {
  children: ReactNode
}

function TransactionTable({ children }: TransactionTableProps) {
  return(
    <table className="transaction-table-container">
      <thead>
        <tr className="transaction-table-header">
          <th className="transaction-table-header-col">CONTA</th>
          <th className="transaction-table-header-col">VALOR</th>
          <th className="transaction-table-header-col">CATEGORIA</th>
          <th className="transaction-table-header-col">DATA</th>
          <th className="transaction-table-header-col">DESCRICÃO</th>
          <th className="transaction-table-header-col">EDITE</th>
        </tr>
      </thead>
      <tbody className="transaction-table-body">
        {children}
      </tbody>
    </table>
  )
}

export default TransactionTable;