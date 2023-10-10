import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import api from "../../api";

interface ModalAddAccountProps {
  visible?: boolean;
  handleClick: (event: FormEvent) => void;
}

function ModalAddAccount({ visible = false, handleClick }: ModalAddAccountProps) {

  const [ name, setName ] = useState<string>("");

  function getAccountName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  async function addAccount(event: FormEvent) {
    event.preventDefault();
    const response = await api.post("/accounts", { name })
    if(response.status === 201) { 
      setName("");
      handleClick(event);
    }

    console.log(response)
  }

  return(
    <Modal.Container visible={visible} handleSubmit={addAccount} method="post">
      <Modal.Fields>
        <SectionHeader.Container>
          <SectionHeader.Title text="Adicionar Conta"/>
        </SectionHeader.Container>
        <Input 
          required
          minlength={3} 
          maxLength={30}
          type="text"
          label="Name" 
          id="name"
          value={name}
          handleChange={getAccountName}
        />
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Salvar" variant="confirm" type="submit" icon={AiOutlineSave} />
        <Button text="Cancelar" type="button" icon={AiOutlineClose} handleClick={handleClick}/>
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalAddAccount;