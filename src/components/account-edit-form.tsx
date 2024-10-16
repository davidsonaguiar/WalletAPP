import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { axios } from "../../lib/axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface AccountEditInput {
    id: string;
    name: string;
}

interface Props {
    closeForm: () => void;
    id: string;
    name: string;
}

async function accountEdit(data: AccountEditInput) {
    const response = await axios.put(`/accounts/${data.id}`, { name: data.name });
    return await response.data;
}

export default function AccountEditForm(props: Props) {
    const { register, handleSubmit } = useForm<AccountEditInput>({
        values: { id: props.id, name: props.name },
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: accountEdit,
        mutationKey: ["editAccount"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            props.closeForm();
        },
    });

    function onSubmit(data: AccountEditInput) {
        mutate({ ...data, id: props.id });
    }

    return (
        <form className="account-card-header" onSubmit={handleSubmit(onSubmit)}>
            <input
                required
                minLength={3}
                maxLength={30}
                type="text"
                className="account-card-header-input"
                {...register("name", { required: true })}
                disabled={isPending}
            />
            <button
                type="submit"
                className="account-card-header-button confirm border-bottom-none border-top"
            >
                <AiOutlineCheck size={18} color="#333333" />
            </button>
            <button
                className="account-card-header-button confirm border-bottom-none border-top"
                onClick={props.closeForm}
            >
                <AiOutlineClose size={18} color="#333333" />
            </button>
        </form>
    );
}
