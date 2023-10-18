import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Button from "../../component/Button";
import HeaderSection from "../../component/SectionHeader";
import MetaTable from "../../component/MetaTable";
import ModalAddMeta from "../../component/ModalAddMeta";
import { useEffect, useState } from "react";
import api from "../../api";
import { MetaCategory, Transaction } from "../../types";
import ModalEditMeta from "../../component/ModalEditMeta";

function Meta() {
  const [metas, setMetas] = useState<MetaCategory[]>([]);
  const [metaEdit, setMetaEdit] = useState<MetaCategory | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  const categoryTotals: { [categoryId: number]: number } = {};

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
  }, []);

  transactions.forEach((transaction) => {
    const categoryId = transaction.category.id;
    const amount = transaction.value;
    const [year, month] = transaction.date.split("T")[0].split("-");

    const metaCategory = metas.filter(
      (meta) => meta.category.id === categoryId
    )[0];

    if ( metaCategory && Number(year) === metaCategory.year && Number(month) === metaCategory.month ) {
      if (categoryTotals[categoryId]) {
        categoryTotals[categoryId] += amount;
      } else {
        categoryTotals[categoryId] = amount;
      }
    }
  });

  const registerMetas = metas.map((meta) => {
    const color =
      categoryTotals[meta.category.id] > meta.value
        ? "alert"
        : meta.value - meta.value * 0.1 < categoryTotals[meta.category.id]
        ? "warning"
        : "";

    return (
      <tr className={"transaction-register-container " + color}>
        <td>{meta.category.name}</td>
        <td>
          {meta.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </td>
        <td>
          {(categoryTotals[meta.category.id] || 0).toLocaleString("pt-BR", {
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
            <AiOutlineDelete size={20} />
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
