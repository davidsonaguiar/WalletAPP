import Modal from "../Modal";
import HeaderSection from "../SectionHeader";
import Button from "../Button";
import Input from "../Input";
import api from "../../api";
import Select from "../Select";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { useEffect, useState, FormEvent } from "react";
import { Category, MetaCategory } from "../../types";

interface ModalAddMetaProps {
  visible: boolean;
  meta: MetaCategory;
  handleAdd: () => void;
}

function ModalEditMeta({ visible, meta, handleAdd }: ModalAddMetaProps) {

  const [ value, setValue ] = useState(meta.value.toString());
  const [ date, setDate ] = useState(`${meta.year}-${meta.month}`);
  const [ category, setCategory ] = useState(meta.category.name);
  const [ categories, setCategories ] = useState<Category[]>([]);
  const currentDate = new Date(); 

  async function getCategory() {
    const response = await api.get("/categories");
    if(response.status === 200) {
      const data: Category[] = await response.data;
      const categoryFilter = data.filter((el) => {
        return el.type === "Gastos";
      });

      setCategories(categoryFilter);
    }
  }

  useEffect(() => {
    getCategory();
  }, [])

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    const [ year, month ] = date.split("-");
    const category_id = categories.filter(el => el.name === category)[0].id;
    const body = { id: meta.id, year, month, value, category_id };
    const response = await api.put("/metas/" + meta.id, body);
    if(response.status === 200) {
      handleAdd();
    }
  }

  const categoriesName: string[] = categories.map(category => category.name);

  return(
    <Modal.Container visible={visible} handleSubmit={handleSubmitForm} method="post">
      <Modal.Fields>
        <HeaderSection.Container>
          <HeaderSection.Title text="Editar Meta"/>
          <Button text="Fechar" type="button" icon={AiOutlineClose} handleClick={handleAdd}/>
        </HeaderSection.Container>
        <Select 
          id="category" 
          options={categoriesName}
          value={category}
          required
          handleChange={(event) => setCategory(event.target.value)}
        />
        <Input 
          label="Valor" 
          id="value" 
          type="number"
          value={value}
          handleChange={(event) => setValue(event.target.value)}
          required
        />
        <Input 
          type="month" 
          label="Mês"
          id="date" 
          min={`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`}
          value={date} 
          handleChange={(event) => setDate(event.target.value)} 
          required
        />
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Editar" variant="confirm" type="submit" icon={AiOutlineSave} />
      </Modal.Buttons>

    </Modal.Container>
  );
}


export default ModalEditMeta;