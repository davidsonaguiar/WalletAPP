import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { axios } from "../../lib/axios";
import { Category } from "./category-list";

interface UserFormProps {
    name: string;
    type: string;
}

interface Props {
    category: Category;
    changeEdit: () => void;
}

export default function CategoryEditForm(props: Props) {
    const { register, handleSubmit } = useForm<UserFormProps>({
        defaultValues: props.category
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UserFormProps) => {
            const response = await axios.put(`/categories/${props.category.id}`, data);
            return response.data;
        },
        onSuccess: () => {
            props.changeEdit();
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    function onSubmit(data: UserFormProps) {
        mutate(data);
    }

    return (
        <form
            method="post"
            className="category-edit"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                type="text"
                className="category-edit-input"
                required
                disabled={isPending}
                {...register("name", { required: true, minLength: 3, maxLength: 30 })}
            />
            <select {...register("type", { required: true })} required disabled={isPending}>
                <option value="" disabled defaultChecked>
                    Selecione
                </option>
                <option value="INPUT">INPUT</option>
                <option value="OUTPUT">OUTPUT</option>
            </select>
            <button type="submit" className="account-card-header-button confirm" disabled={isPending}>
                <AiOutlineCheck size={18} color="#FFFFFF" />
            </button>
            <button type="button" className="account-card-header-button" onClick={props.changeEdit} disabled={isPending}>
                <AiOutlineClose size={18} color="#FFFFFF" />
            </button>
        </form>
    );
}
