import Modal from "../Modal";
import HeaderSection from "../SectionHeader";
import Button from "../Button";
import Input from "../Input";
import { axios } from "../../../lib/axios";
import Select from "../Select";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState, FormEvent } from "react";
import { Category } from "../../types";

interface ModalAddMetaProps {
    visible: boolean;
    handleAdd: () => void;
}

function ModalAddMeta({ visible, handleAdd }: ModalAddMetaProps) {
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const currentDate = new Date();

    async function getCategory() {
        const response = await axios.get("/categories");
        if (response.status === 200) {
            const data: Category[] = await response.data;
            const categoryFilter = data.filter((el) => {
                return el.type === "Gastos";
            });

            setCategories(categoryFilter);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    async function handleSubmitForm(event: FormEvent) {
        event.preventDefault();
        const [year, month] = date.split("-");
        const category_id = categories.filter((el) => el.name === category)[0].id;
        const body = { year, month, value, category_id };

        console.log(body);

        const response = await axios.post("/metas", body);
        if (response.status === 201) {
            handleAdd();
        }
    }

    const categoriesName: string[] = categories.map((category) => category.name);

    return (
        <Modal.Container visible={visible} handleSubmit={handleSubmitForm} method="post">
            <Modal.Fields>
                <HeaderSection.Container>
                    <HeaderSection.Title text="Adicionar Meta" />
                    <Button
                        text="Fechar"
                        type="button"
                        icon={AiOutlineClose}
                        handleClick={handleAdd}
                    />
                </HeaderSection.Container>
                <Select
                    id="category"
                    options={categoriesName}
                    value={category}
                    required
                    handleChange={(event) => setCategory(event.target.value)}
                />
                <Input
                    label="Valor"
                    id="value"
                    type="number"
                    value={value}
                    handleChange={(event) => setValue(event.target.value)}
                    required
                />
                <Input
                    type="month"
                    label="Mês"
                    id="date"
                    min={`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`}
                    value={date}
                    handleChange={(event) => setDate(event.target.value)}
                    required
                />
            </Modal.Fields>
            <Modal.Buttons>
                <Button
                    text="Adicionar Meta"
                    variant="confirm"
                    type="submit"
                    icon={AiOutlinePlus}
                />
            </Modal.Buttons>
        </Modal.Container>
    );
}

export default ModalAddMeta;
