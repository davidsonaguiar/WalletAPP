import { axios } from "../../../lib/axios";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FormEvent, useState } from "react";
import Modal from "../Modal";
import SectionHeader from "../SectionHeader";
import Button from "../Button";
import CategoryList from "../category-list";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ModalAddCategoryProps {
    handleClick: (event?: FormEvent) => void;
}

interface Category {
    name: string;
    type: string;
}

function ModadAddCategory({ handleClick }: ModalAddCategoryProps) {
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
        <div className="modal-background">
            <div className="modal-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-fields">
                        <div className="section-header-container">
                            <h2 className="section-header-title">Adicionar Categoria</h2>
                            <button type="button" className="button" onClick={handleClick}>
                                Fechar
                            </button>
                        </div>

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
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="button confirm" onClick={handleClick}>
                            <AiOutlinePlus />
                            Adicionar na lista
                        </button>
                    </div>
                </form>
                <CategoryList />
            </div>
        </div>
    );
}

export default ModadAddCategory;
