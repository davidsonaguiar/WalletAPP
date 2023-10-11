import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import api from "../../api";
import Select from "../Select";

type Account = {
  id: string;
  name: string;
  user_id?: string;
};

interface ModalAddAccountProps {
  accounts: Account[];
  visible?: boolean;
  handleClick: (event?: FormEvent) => void;
}

type Category = {
  id: string;
  name: string;
  type: string;
};

const initialState = {
  value: "",
  type: "",
  category: "",
  date: "",
  account: "",
  description: "",
};

function ModalAddTransaction({
  accounts,
  visible = false,
  handleClick,
}: ModalAddAccountProps) {
    const [categories, setCategories] = useState<Category[]>([]);
  const [inputs, setInputs] = useState(initialState);

  async function getCategories() {
    const response = await api.get("/categories");
    if (response.status === 200) {
      const data = await response.data;
      setCategories(data);
    } else {
      console.log("erro ao pegar categorias");
    }
  }

  useEffect(() => {
    getCategories();
  }, [visible]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  }

  async function addTransaction(event: FormEvent) {
    event.preventDefault();
    const idAccount = accounts.filter(
      (account) => account.name === inputs.account
    )[0].id;

    const idCategory = categories.filter(
      (category) => category.name === inputs.category
    )[0].id;

    const body = {
      value: Number(inputs.value),
      id_category: idCategory,
      date: new Date(inputs.date),
      id_account: idAccount,
      description: inputs.description,
    };

    console.log(body);

    const response = await api.post("/transactions", body);

    if (response.status === 201) {
      const data = await response.data;
      console.log(data);
      setInputs(initialState);
      handleClick(event);
    }
  }

  const accountList = accounts.map((account) => account.name);

  const categoryList = categories
    .filter((category: Category) => category.type === inputs.type)
    .map((category: Category) => category.name);

  return (
    <Modal.Container visible={visible} method="post" handleSubmit={addTransaction}>
      <Modal.Fields>
        <SectionHeader.Container>
          <SectionHeader.Title text="Adicionar Transação" />
        </SectionHeader.Container>
        <Select
          required
          id="type"
          handleChange={handleChange}
          label="Tipo"
          value={inputs.type}
          options={["Ganhos", "Gastos"]}
        />
        <Select
          required
          id="account"
          handleChange={handleChange}
          label="Conta"
          value={inputs.account}
          options={accountList}
        />
        <Input
          required
          type="number"
          label="Valor"
          id="value"
          min={1}
          value={inputs.value.toString()}
          handleChange={handleChange}
        />
        <Input
          required
          label="Data da Transferência"
          id="date"
          type="date"
          value={inputs.date}
          handleChange={handleChange}
        />
        <Select
          required
          id="category"
          handleChange={handleChange}
          label="Categoria"
          value={inputs.category}
          disabled={inputs.type === ""}
          options={categoryList}
        />
        <Input
          label="Descrição"
          id="description"
          value={inputs.description}
          handleChange={handleChange}
        />
      </Modal.Fields>
      <Modal.Buttons>
        <Button
          text="Salvar"
          type="submit"
          variant="confirm"
          icon={AiOutlineSave}
        />
        <Button
          text="Cancelar"
          icon={AiOutlineClose}
          handleClick={handleClick}
        />
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalAddTransaction;
