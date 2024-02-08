import Modal from "../Modal";
import HeaderSection from "../SectionHeader";
import Button from "../button";
import Select from "../Select";
import Papa, { ParseResult } from "papaparse";
import { AiOutlinePlus, AiOutlineClose, AiOutlineFile } from 'react-icons/ai';
import { Account } from '../../types/index';
import { useState, FormEvent, ChangeEvent } from 'react';
import api from "../../axios";

interface ModalImportTransactionProps {
  visible: boolean;
  accounts: Account[];
  changeModal: (event?: FormEvent) => void;
}

type csvTransaction = {
  0: string,
  1: string,
  2: string,
}


function ModalImportTransaction({ visible, accounts, changeModal }: ModalImportTransactionProps) {

  const [account, setAccount] = useState<string>("");
  const [file, setFile] = useState<File>();

  const accountList = accounts.map((account) => account.name);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile.type)
    }
  };

  async function parseCsv(listTransactions: csvTransaction[]) {
    const transactionList = listTransactions.map((transaction) => {
      const validDate = transaction[0].trim().split("-").reverse().join("-");

      const value = Number(transaction[1]) > 0 ? Number(transaction[1]): -1 * Number(transaction[1]);
      const category = Number(transaction[1]) > 0 ? 13 : 9 ;
      const date = new Date(validDate);
      const description = transaction[2];
      const currentAccount = accounts.filter((el) => el.name === account)[0].id;

      return { 
        value, 
        id_category: category,
        date, 
        description, 
        id_account: currentAccount 
      }

    });

    transactionList.forEach(async (transaction) => {
      const response = await api.post("/transactions", transaction);
      if(response.status === 201) {
        const data = await response.data;
        console.log("Adicionada com sucesso", data);
      } else {
        console.log("error");
      }
    });
  }

  function handleFileUpload() {
    if(file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (data: ParseResult<csvTransaction>) => parseCsv(data.data)
      });
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (file) {
      handleFileUpload();
    } else {
      console.log("Erro no parse")
    }
  }

  return (
    <Modal.Container visible={visible} method="post" handleSubmit={handleSubmit}>
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
            <AiOutlineFile size={20} />
            Selecione um Arquivo
          </label>
          <input type="file" id="doc" className="input-file" onChange={handleFileChange} accept=".csv"/>
        </div>
      </Modal.Fields>
      <Modal.Buttons>
        <Button text="Adicionar na lista" variant="confirm" type="submit" icon={AiOutlinePlus} />
      </Modal.Buttons>
    </Modal.Container>
  );
}

export default ModalImportTransaction;