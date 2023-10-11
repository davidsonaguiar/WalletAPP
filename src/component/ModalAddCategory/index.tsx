import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import api from "../../api";
import { Category } from "../../types";
import { FormEvent, useState, useEffect } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai"
import ItemCategoryList from "./ItemCategoryList";
import Select from "../Select";

interface ModalAddCategoryProps {
  visible: boolean;
  handleClick: (event?: FormEvent)=> void
}

function ModadAddCategory({ visible, handleClick }: ModalAddCategoryProps) {

  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  const [ name, setName ] = useState<string>("");
  const [ type, setType ] = useState<string>("");
  const [categories, setCategories ] = useState<Category[]>([]);

  
  async function getCategories() {
    const response = await api.get("/categories");
    if(response.status === 200) {
      const date = await response.data;
      setCategories(date);
    }
  }

  async function addCategory(event: FormEvent){
    event.preventDefault();
    const response = await api.post("/categories", { name, type });

    if(response.status === 201) {
      console.log("Categoria adicionada com sucesso.")
      setName("");
      setType("");
      getCategories();
    }
  }

  function updateEdit(edit: boolean) {
    setIsEdit(edit);
  }

  useEffect(() => {
    getCategories();
  }, [isEdit, visible])

  const categoriesList = categories.filter((category: Category) => category.user_id)
  .map((category: Category) => (
    <ItemCategoryList category={category} isEdit={updateEdit} key={category.id} />
  ));

  return(
    <Modal.Container visible={visible} handleSubmit={addCategory} method="post">
      <Modal.Fields>
        <SectionHeader.Container>
          <SectionHeader.Title text="Adicionar Categoria"/>
        </SectionHeader.Container>
        <Input 
          required
          minLength={3}
          maxLength={30}
          type="text"
          label="Name" 
          id="name"
          value={name}
          handleChange={(event) => setName(event.target.value)}
        />
        <Select 
          required
          id="type"
          label="Tipo"
          options={[ "Gastos", "Ganhos" ]}
          value={type}
          handleChange={(event) => setType(event.target.value)}
        />
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Salvar" variant="confirm" type="submit" icon={AiOutlineSave} />
        <Button text="Cancelar" type="button" icon={AiOutlineClose} handleClick={handleClick}/>
      </Modal.Buttons>
      <ul className="categoryList">
        { categoriesList }
      </ul>
    </Modal.Container>
  );
}

export default ModadAddCategory;