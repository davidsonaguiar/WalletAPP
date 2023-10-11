import { AiOutlineCheck, AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Category } from "../../types";
import { useState, FormEvent, ChangeEvent } from "react";
import api from "../../api";

interface ItemCategoryListProps {
  category: Category;
  deleted: () => void;
  isEdit: (edit: boolean) => void;
}

function ItemCategoryList({ category , isEdit, deleted}: ItemCategoryListProps) {

  const [ name, setName ] = useState<string>(category.name);
  const [type, setType ] = useState<string>(category.type);
  const [edit, setEdit ] = useState<boolean>(false);
  
  
  function changeEdit(event: FormEvent) {
    event.preventDefault();
    setEdit(!edit);
    isEdit(!edit);
  }
  
  async function removeCategory(event: FormEvent) {
    event.preventDefault();
    const response = await api.delete("/categories/" + category.id);
    if(response.status === 200) {
      console.log("Categoria deletada com sucesso!");
      deleted();
    }
  }
  
  async function upadateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.put("/categories/" + category.id, { name, type });
    if(response.status === 200) {
      console.log("Categoria editada com sucesso!");
      changeEdit(event);
    }
  }

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleType(event: ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value);
  }

  return(
    <li className="account-card-header">
      {
        !edit
          ? 
          <>
            <span className="category-name">
              {category.name}
            </span>
            <button className="account-card-header-button edit" onClick={changeEdit}>
              <AiOutlineEdit size={18} color="#FFFFFF"/>
            </button>
            <button className="account-card-header-button delete" onClick={removeCategory}>
              <AiOutlineDelete size={18} color="#FFFFFF"/>
            </button>
          </>
          : 
          <>
            <form method="post" className="category-edit" onSubmitCapture={(event) => upadateCategory(event)}>
              <input type="text" className="category-edit-input" value={name} onChange={handleName} required min={3} max={30}/>
              <select value={type} onChange={handleType} required >
              <option value="" disabled defaultChecked>Selecione</option>
                <option value="Gastos">Gastos</option>
                <option value="Ganhos">Ganhos</option>
              </select>
              <button type="submit" className="account-card-header-button confirm">
                <AiOutlineCheck size={18} color="#FFFFFF"/>
              </button>
              <button className="account-card-header-button" onClick={changeEdit}>
                <AiOutlineClose size={18} color="#FFFFFF"/>
              </button>
            </form>              
          </>
      }
    </li>
  );
}

export default ItemCategoryList;