import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import api from "../../api";
import Select from "../Select";
import { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineSave, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { Category, Account, Transaction } from "../../types";

interface ModalEditAccountProps {
  accounts: Account[];
  visible?: boolean;
  transaction: Transaction;
  handleClick: (open: boolean) => void;
}

function ModalEditTransaction({
  accounts,
  visible = false,
  transaction,
  handleClick,
}: ModalEditAccountProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputs, setInputs] = useState({
    id: transaction.id,
    value: transaction.value,
    date: transaction.date,
    type: transaction.category.type,
    description: transaction.description,
    category: transaction.category.name,
    account: transaction.account.name,
  });

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
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  }

  async function editTransaction() {
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

    const response = await api.put("/transactions/" + transaction.id, body);

    console.log(response.status);

    if (response.status === 200) {
      handleClick(false);
    }
  }

  async function deleteTransaction() {
    const response = await api.delete("/transactions/" + transaction.id);
    if (response.status === 200) {
      handleClick(false);
    }
  }

  const accountList = accounts.map((account) => account.name);

  const categoryList = categories
    .filter((category: Category) => category.type === inputs.type)
    .map((category: Category) => category.name);

  return (
    <Modal.Container visible={visible}>
      <Modal.Fields>
        <SectionHeader.Container>
          <SectionHeader.Title text={"Editar Transaction"} />
          <Button
            icon={AiOutlineDelete}
            text="Delete"
            handleClick={deleteTransaction}
            variant="delete"
          />
        </SectionHeader.Container>
        <Select
          id="type"
          handleChange={handleChange}
          label="Tipo"
          value={inputs.type}
          options={["Ganhos", "Gastos"]}
        />
        <Select
          id="account"
          handleChange={handleChange}
          label="Conta"
          value={inputs.account}
          options={accountList}
        />
        <Input
          type="number"
          label="Valor"
          id="value"
          value={inputs.value.toString()}
          handleChange={handleChange}
        />
        <Input
          label="Data da Transferência"
          id="date"
          type="date"
          value={inputs.date}
          handleChange={handleChange}
        />
        <Select
          id="category"
          handleChange={handleChange}
          label="Categoria"
          value={inputs.type}
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
          variant="confirm"
          icon={AiOutlineSave}
          handleClick={editTransaction}
        />
        <Button
          text="Cancelar"
          icon={AiOutlineClose}
          handleClick={() => handleClick(false)}
        />
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalEditTransaction;
