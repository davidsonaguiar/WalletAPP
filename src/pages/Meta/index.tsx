import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Button from "../../component/Button";
import HeaderSection from "../../component/SectionHeader";
import MetaTable from "../../component/MetaTable";
import ModalAddMeta from "../../component/ModalAddMeta";
import { useEffect, useState } from "react";
import api from "../../api";
import { MetaCategory } from "../../types";
import ModalEditMeta from "../../component/ModalEditMeta";

function Meta() {

  const [ metas, setMetas ] = useState<MetaCategory[]>([]);
  const [ metaEdit, setMetaEdit ] = useState<MetaCategory | undefined>(undefined);
  const [ add, setAdd ] = useState<boolean>(false);
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ remove, setRemove ] = useState<boolean>(false);

  async function getMetas() {
    const response = await api.get("/metas");
    if(response.status === 200) {
      console.log(await response.data);
      setMetas(await response.data);
    }
  }

  async function deleteMeta(id: string) {
    const response = await api.delete("/metas/" + id);
    if(response.status === 200) {
      setRemove(!remove)
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
  }, [add, remove, edit])

  const registerMetas = metas.map((meta) => {
    return(
      <tr className="transaction-register-container">
        <td>{meta.category.name}</td>
        <td>
          {
            meta.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }
        </td>
        <td>{`${meta.month}/${meta.year}`}</td>
        <td>
          <button className="transaction-register-edit" onClick={() => handleEditMeta(meta)}>
            <AiOutlineEdit size={20}/>
          </button>
        </td>
        <td>
          <button className="transaction-register-delete" onClick={() => deleteMeta(meta.id)}>
            <AiOutlineDelete size={20}/>
          </button>
        </td>
      </tr>
    );
  })

  return(
    <>
      <HeaderSection.Container>
        <HeaderSection.Title text="Minhas Metas" />
        <Button text="Metas" icon={AiOutlinePlus} handleClick={openAdd} />
      </HeaderSection.Container>
      <MetaTable>
        { registerMetas }
      </MetaTable>
      <ModalAddMeta visible={add} handleAdd={openAdd}/>
      {
        metaEdit &&
        <ModalEditMeta visible={edit} meta={metaEdit} handleAdd={openEdit}/>
      }
    </>
  );
}

export default Meta;