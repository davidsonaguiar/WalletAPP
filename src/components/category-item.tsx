import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState, FormEvent } from "react";
import { axios } from "../../lib/axios";
import { Category } from "./category-list";
import CategoryEditForm from "./category-edit-form";

interface ItemCategoryListProps {
    category: Category;
    deleted: () => void;
    isEdit: (edit: boolean) => void;
}

function ItemCategoryList({ category, isEdit, deleted }: ItemCategoryListProps) {
    const [edit, setEdit] = useState<boolean>(false);

    function changeEdit() {
        setEdit(!edit);
        isEdit(!edit);
    }

    async function removeCategory(event: FormEvent) {
        event.preventDefault();
        const response = await axios.delete("/categories/" + category.id);
        if (response.status === 200) {
            console.log("Categoria deletada com sucesso!");
            deleted();
        }
    }

    if (edit) {
        return (
            <li className="account-card-header">
                <CategoryEditForm category={category} changeEdit={changeEdit} />
            </li>
        );
    }

    return (
        <li className="account-card-header">
            <p className="category-name">
                <span>{category.name}</span>
                <span className={`category-type ${category.type}`}>{category.type}</span>
            </p>
            <button className="account-card-header-button edit" onClick={changeEdit}>
                <AiOutlineEdit size={18} color="#FFFFFF" />
            </button>
            <button className="account-card-header-button delete" onClick={removeCategory}>
                <AiOutlineDelete size={18} color="#FFFFFF" />
            </button>
        </li>
    );
}

export default ItemCategoryList;
