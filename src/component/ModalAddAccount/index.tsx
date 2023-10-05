import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import { useState,ChangeEvent } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import api from "../../api";

interface ModalAddAccountProps {
  visible?: boolean;
  handleClick: () => void;
}

function ModalAddAccount({ visible = false, handleClick }: ModalAddAccountProps) {

  const [ name, setName ] = useState<string>("");

  function getAccountName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  async function addAccount() {
    const response = await api.post("/accounts", { name })
    if(response.status === 201) {
      setName("");
      handleClick();
    }
  }

  return(
    <Modal.Container visible={visible}>
      <Modal.Fields>
        <SectionHeader.Container>
          <SectionHeader.Title text="Adicionar Conta"/>
        </SectionHeader.Container>
        <Input 
          label="Name" 
          id="name"
          value={name}
          handleChange={getAccountName}
        />
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Salvar" variant="confirm" icon={AiOutlineSave} handleClick={addAccount}/>
        <Button text="Cancelar" icon={AiOutlineClose} handleClick={handleClick}/>
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalAddAccount;