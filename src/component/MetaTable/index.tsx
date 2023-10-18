import { ReactNode } from "react";

interface MetaTableProps {
  children: ReactNode
}

function MetaTable({ children }: MetaTableProps) {
  return(
    <table className="transaction-table-container">
      <thead>
        <tr className="transaction-table-header">
          <th className="transaction-table-header-col">CATEGORIA</th>
          <th className="transaction-table-header-col">VALOR</th>
          <th className="transaction-table-header-col">DATA</th>
          <th className="transaction-table-header-col">EDITE</th>
          <th className="transaction-table-header-col">DELETE</th>
        </tr>
      </thead>
      <tbody className="transaction-table-body">
        {children}
      </tbody>
    </table>
  )
}

export default MetaTable;