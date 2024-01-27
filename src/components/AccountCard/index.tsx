import { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import api from "../../axios.instance";

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

  function handleClickConfirm(event: FormEvent) {
    event.preventDefault();
    api.put("/accounts/" + id, { name: accountName })
      .then(() => {
        edit(false);
        setEditCard((prev) => !prev);
        setAccountName(accountName)
      })
      .catch(console.log);
  }

  function handleClickDelete(event: FormEvent) {
    event.preventDefault();
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
        <form className="account-card-header" method="post" onSubmit={handleClickConfirm}>
            <input 
              required
              minLength={3}
              maxLength={30}
              type="text" 
              className="account-card-header-input"
              value={accountName}
              onChange={handleChangeInputName}
            />
          <button type="submit" className="account-card-header-button confirm border-bottom-none border-top">
            <AiOutlineCheck size={18} color="#333333"/>
          </button>
          <button className="account-card-header-button confirm border-bottom-none border-top" onClick={handleCancel}>
            <AiOutlineClose size={18} color="#333333"/>
          </button>
        </form>
      }
    </li>
  );
}

export default AccountCard; 