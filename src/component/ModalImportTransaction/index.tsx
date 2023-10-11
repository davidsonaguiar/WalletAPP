import Modal from "../Modal";
import HeaderSection from "../SectionHeader";
import Button from "../Button";
import Select from "../Select";
import { AiOutlinePlus, AiOutlineClose, AiOutlineFile } from 'react-icons/ai';
import { Account } from '../../types/index';
import { useState, FormEvent, ChangeEvent } from 'react';

interface ModalImportTransactionProps {
  visible: boolean;
  accounts: Account[];
  changeModal: (event?: FormEvent) => void;
}

function ModalImportTransaction({ visible, accounts, changeModal }: ModalImportTransactionProps) {

  const [ account, setAccount ] = useState<string>("");

  const accountList = accounts.map((account) => account.name);

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    console.log(event)
  }

  return (
    <Modal.Container visible={visible} method="post" handleSubmit={console.log}>
      <Modal.Fields>
        <HeaderSection.Container>
          <HeaderSection.Title text={"Importar Transações"} />
          <Button
            icon={AiOutlineClose}
            text="Fechar"
            handleClick={changeModal}
          />
        </HeaderSection.Container>
        <Select 
          required
          id="account"
          label="Conta"
          options={accountList}
          value={account}
          handleChange={(event) => setAccount(event.target.value)}
        />
        <div className="input-file-container">
          <label htmlFor="doc" className="imput-file-label">
            <AiOutlineFile size={20}/>
            Selecione um Arquivo
          </label>
          <input type="file" id="doc" className="input-file" onChange={changeFile}/>
        </div>
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Adicionar na lista" variant="confirm" type="submit" icon={AiOutlinePlus} />
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalImportTransaction;