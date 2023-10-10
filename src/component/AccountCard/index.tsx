import { useState, ChangeEvent } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import api from "../../api";

interface AccountCardProps {
  id: string;
  title: string;
  value: number;
  edit: (status: boolean) => void;
}

function AccountCard({ id, title, value, edit }: AccountCardProps) {

  const [ editCard, setEditCard ] = useState<boolean>(false);
  const [ accountName, setAccountName ] = useState<string>(title);

  const handleChangeInputName =(event: ChangeEvent<HTMLInputElement>) => setAccountName(event.target.value);
  
  function handleClickEdit() {
    setEditCard((prev) => !prev);
    edit(true);
  } 

  function handleClickConfirm() {
    api.put("/accounts/" + id, { name: accountName })
      .then(() => {
        edit(false);
        setEditCard((prev) => !prev);
        setAccountName(accountName)
      })
      .catch(console.log);
  }

  function handleClickDelete() {
    api.delete("/accounts/" + id)
      .then(() => {
        edit(false);
      })
      .catch(console.log);
  }

  function handleCancel() {
    setEditCard((prev) => !prev);
  }

  return(
    <li className="account-card-container">
      <span className="account-card-header">
          <span className="account-card-header-title">
            {accountName}
          </span>
          { !editCard
              ? <button className="account-card-header-button edit" onClick={handleClickEdit}>
                  <AiOutlineEdit size={18} color="#333333"/>
                </button>
              : <button className="account-card-header-button delete" onClick={handleClickDelete}>
                  <AiOutlineDelete size={18} color="#333333"/>
                </button> 
          }
      </span>
      <span className="account-card-value">
        {
          value?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
      {
        editCard &&
        <span className="account-card-header">
          <input 
              type="text" 
              className="account-card-header-input"
              value={accountName}
              onChange={handleChangeInputName}
          />
          <button className="account-card-header-button confirm border-bottom-none border-top" onClick={handleClickConfirm}>
            <AiOutlineCheck size={18} color="#333333"/>
          </button>
          <button className="account-card-header-button confirm border-bottom-none border-top" onClick={handleCancel}>
            <AiOutlineClose size={18} color="#333333"/>
          </button>
        </span>
      }
    </li>
  );
}

export default AccountCard; 