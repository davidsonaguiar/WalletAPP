import Button from "../../components/Button";
import HeaderSection from "../../components/SectionHeader";
import MetaTable from "../../components/MetaTable";
import ModalAddMeta from "../../components/ModalAddMeta";
import api from "../../axios.instance";
import ModalEditMeta from "../../components/ModalEditMeta";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MetaCategory, Transaction } from "../../types";

function Meta() {
  const [metas, setMetas] = useState<MetaCategory[]>([]);
  const [metaEdit, setMetaEdit] = useState<MetaCategory | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);


  async function getTransactions() {
    const response = await api.get("/transactions");
    if (response.status === 200) {
      setTransactions(await response.data);
    }
  }

  async function getMetas() {
    const response = await api.get("/metas");
    if (response.status === 200) {
      setMetas(await response.data);
    }
  }

  async function deleteMeta(id: string) {
    const response = await api.delete("/metas/" + id);
    if (response.status === 200) {
      setRemove(!remove);
    }
  }

  function openEdit() {
    setEdit(!edit);
  }

  function handleEditMeta(meta: MetaCategory) {
    setMetaEdit(meta);
    openEdit();
  }

  function openAdd() {
    setAdd(!add);
  }

  useEffect(() => {
    getMetas();
  }, [add, remove, edit]);

  useEffect(() => {
    getTransactions();
  }, [add, remove, edit]);



  type CategoryMonthKey = `${string}-${string}-${string}`;

  const categoryMonthTotals: Record<CategoryMonthKey, number> = {};

  transactions.forEach((transaction) => {
    const categoryId = transaction.category.id;
    const amount = transaction.value;
    const [year, month] = transaction.date.split("T")[0].split("-");

    const key: CategoryMonthKey = `${categoryId}-${year}-${month}`;

    if (categoryMonthTotals[key]) {
      categoryMonthTotals[key] += amount;
    } else {
      categoryMonthTotals[key] = amount;
    }
  });


  const registerMetas = metas.map((meta) => {
    const key: CategoryMonthKey = `${meta.category.id}-${meta.year}-${meta.month}`;
    const categoryTotal = categoryMonthTotals[key];
    
    const color =
      categoryTotal > meta.value
        ? "alert"
        : categoryTotal > (meta.value - (meta.value * 0.1))
        ? "warning"
        : "";

    return (
      <tr className={"transaction-register-container " + color} key={meta.id}>
        <td>{meta.category.name}</td>
        <td>
          {meta.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </td>
        <td>
          {(categoryTotal || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </td>
        <td>{`${meta.month}/${meta.year}`}</td>
        <td>
          <button
            className="transaction-register-edit"
            onClick={() => handleEditMeta(meta)}
          >
            <AiOutlineEdit size={20} />
          </button>
        </td>
        <td>
          <button
            className="transaction-register-delete"
            onClick={() => deleteMeta(meta.id)}
          >
            <AiOutlineDelete size={20}/>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <HeaderSection.Container>
        <HeaderSection.Title text="Minhas Metas" />
        <Button text="Metas" icon={AiOutlinePlus} handleClick={openAdd} />
      </HeaderSection.Container>
      <MetaTable>{registerMetas}</MetaTable>
      <ModalAddMeta visible={add} handleAdd={openAdd} />
      {metaEdit && (
        <ModalEditMeta visible={edit} meta={metaEdit} handleAdd={openEdit} />
      )}
    </>
  );
}

export default Meta;
