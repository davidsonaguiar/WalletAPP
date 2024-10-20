import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import ItemCategoryList from "./category-item";

export interface Category {
    id: number;
    name: string;
    type: string;
}

async function getCategories() {
    const response = await axios.get("/categories");
    return response.data;
}

export default function CategoryList() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const categoriesList = data
        ?.map((category: Category) => (
            <ItemCategoryList
                category={category}
                deleted={() => 0}
                isEdit={() => 0}
                key={category.id}
            />
        ));

    if(isLoading) return <p className="categoryList">Carregando...</p>;

    if(error) return <p className="categoryList">Ocorreu um erro</p>;

    return <ul className="categoryList">{categoriesList}</ul>;
}
