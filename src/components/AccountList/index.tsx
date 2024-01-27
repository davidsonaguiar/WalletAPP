import { ReactNode } from "react";

interface AccountListProps {
  children: ReactNode
}

function AccountList({ children }: AccountListProps) {
  return(
    <div className="account-list-container">
      <ul className="account-list-list">
        {children}
      </ul>
    </div>
  );
}

export default AccountList;