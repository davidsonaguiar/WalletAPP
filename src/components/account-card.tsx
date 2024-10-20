import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { axios } from "../../lib/axios";
import AccountEditForm from "./account-edit-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AccountCardProps {
    id: string;
    title: string;
    balance: number;
}

async function deleteAccount(id: string) {
    const response = await axios.delete("/accounts/" + id);
    return await response.data;
}

function AccountCard({ id, title, balance }: AccountCardProps) {
    const [editCard, setEditCard] = useState<boolean>(false);

    const clientQuery = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            alert("Conta deletada com sucesso!");
            clientQuery.invalidateQueries({ queryKey: ["accounts"] });
        },
    });

    function handleClickEdit() {
        setEditCard((prev) => !prev);
    }

    function handleCancel() {
        setEditCard((prev) => !prev);
    }

    return (
        <li className="account-card-container">
            <span className="account-card-header">
                <span className="account-card-header-title">{title}</span>
                {!editCard ? (
                    <button
                        className="account-card-header-button edit"
                        onClick={handleClickEdit}
                        disabled={isPending}
                    >
                        <AiOutlineEdit size={18} color="#333333" />
                    </button>
                ) : (
                    <button
                        className="account-card-header-button delete"
                        onClick={() => mutate(id)}
                    >
                        <AiOutlineDelete size={18} color="#333333" />
                    </button>
                )}
            </span>
            <span className="account-card-value">
                {balance?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </span>
            {editCard && <AccountEditForm id={id} name={title} closeForm={handleCancel} />}
        </li>
    );
}

export default AccountCard;
