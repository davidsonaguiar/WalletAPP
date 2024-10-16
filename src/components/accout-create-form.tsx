import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAccountInput, createAccount } from "../../services/account/createAccount";
import { useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";

interface Props {
    closeForm: () => void;
}

export default function AccountCreateForm(props: Props) {
    const { register, handleSubmit } = useForm<CreateAccountInput>();
    
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            props.closeForm();
        },
    });

    const onSubmit = (data: CreateAccountInput) => mutate(data);

    return (
        <div className="modal-background">
            <form className="modal-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-fields">
                    <div className="section-header-container">
                        <h2 className="section-header-title">Criar Conta</h2>
                    </div>
                    <label htmlFor="name" className="modal-fields-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="modal-fields-input"
                        {...register("name", { required: true })}
                        disabled={isPending}
                    />
                </div>
                <div className="modal-buttons">
                    <button type="submit" className="button confirm">
                        <AiOutlineSave />
                        Criar Conta
                    </button>
                    <button type="button" className="button default" onClick={props.closeForm}>
                        <AiOutlineClose />
                        Cancelar
                    </button>
                </div>
                <div className="login-border-bottom"></div>
            </form>
        </div>
    );
}
