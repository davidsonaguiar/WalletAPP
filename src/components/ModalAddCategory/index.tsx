import { axios } from "../../../lib/axios";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FormEvent, useState } from "react";
import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import CategoryList from "../category-list";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ModalAddCategoryProps {
    visible: boolean;
    handleClick: (event?: FormEvent) => void;
}

interface Category {
    name: string;
    type: string;
}

function ModadAddCategory({ visible, handleClick }: ModalAddCategoryProps) {
    const [deleted, setDeleted] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    function updateEdit(edit: boolean) {
        setIsEdit(edit);
    }

    function changeDelete() {
        setDeleted((prev) => !prev);
    }

    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm<Category>();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: Category) => {
            const response = await axios.post("/categories", data);
            return response.data;
        },
        onSuccess: () => {
            console.log("Categoria adicionada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    async function onSubmit(data: Category) {
        mutate(data);
    }

    return (
        <Modal.Container visible={visible} handleSubmit={handleSubmit(onSubmit)} method="post">
            <Modal.Fields>
                <SectionHeader.Container>
                    <SectionHeader.Title text="Adicionar Categoria" />
                    <Button
                        text="Fechar"
                        type="button"
                        icon={AiOutlineClose}
                        handleClick={handleClick}
                    />
                </SectionHeader.Container>

                <label htmlFor="name" className="modal-fields-label">
                    NAME
                </label>
                <input
                    type="text"
                    id="name"
                    className="modal-fields-input"
                    placeholder="Nome da categoria"
                    {...register("name", { required: true, minLength: 3, maxLength: 30 })}
                    disabled={isPending}
                />

                <label htmlFor="type" className="modal-fields-label">
                    TYPE
                </label>
                <select
                    id="type"
                    className="modal-fields-input"
                    {...register("type", { required: true })}
                    disabled={isPending}
                >
                    <option value="" disabled selected>
                        Selecione uma Opção
                    </option>
                    <option value="INPUT">INPUT</option>
                    <option value="OUTPUT">OUTPUT</option>
                </select>
                
            </Modal.Fields>
            <Modal.Buttons>
                <Button
                    text="Adicionar na lista"
                    variant="confirm"
                    type="submit"
                    icon={AiOutlinePlus}
                />
            </Modal.Buttons>
            <CategoryList />
        </Modal.Container>
    );
}

export default ModadAddCategory;
