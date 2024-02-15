import { useAccountContext } from "../hooks/useAccountContext";
import { AiOutlineClose } from "react-icons/ai";
import { Label } from "./label";
import { Input } from "./input";
import Button from "./button";
import { Divide } from "./divide";
import { useForm } from "react-hook-form";
import { CreateAccountRequest } from "../models/account.model";

export function DialogAddAccount() {
  const { isCreate, setIsCreate, createAccount } = useAccountContext();
  const {
    register,
    handleSubmit,
  } = useForm<CreateAccountRequest>();

  return (
    <dialog
      open={isCreate}
      className={`absolute top-0 left-0 w-full h-screen bg-zinc-800/70 flex justify-center items-center`}
    >
      <div className="w-full px-10 max-w-md bg-zinc-900 border border-zinc-500">
        <header className="h-14 border-b border-x border-zinc-500 flex justify-between items-center">
          <h2 className="pl-3 text-zinc-300 uppercase">Adicionar Conta</h2>
          <Button
            width="content"
            variant="secondary"
            onClick={() => setIsCreate(false)}
            className="h-full aspect-square border-l border-zinc-500 text-zinc-300 grid place-content-center hover:bg-zinc-800"
          >
            <AiOutlineClose
              className="w-6 h-6"
              onClick={() => setIsCreate(false)}
            />
          </Button>
        </header>
        <form action="#" onSubmit={handleSubmit(createAccount)} className="w-full border-x border-zinc-500">
          <Label>Nome da Conta</Label>
          <Input
            type="text"
            label="name"
            placeholder="Ex.:Inter"
            register={register}
          />
          <Label>Valor inicial</Label>
          <Input
            type="number"
            label="amount"
            placeholder="Ex.:1930,50"
            register={register}
          />
          <Divide />
          <Button type="submit">
            Adicionar
          </Button>
          <Divide />
        </form>
      </div>
    </dialog>
  );
}
