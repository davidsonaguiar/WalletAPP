import { AiOutlinePlus } from "react-icons/ai";
import AccountList from "./account-list";
import Button from "./Button";
import SectionHeader from "./SectionHeader";
import AccountCreateForm from "./accout-create-form";
import { useState } from "react";

export default function AccountSection() {
    const [stateForm, setStateForm] = useState(false);
    const closeForm = () => setStateForm(false);
    const openForm = () => setStateForm(true);

    return (
        <>
            <SectionHeader.Container>
                <SectionHeader.Title text="Minhas Contas" />
                <Button text="Conta" icon={AiOutlinePlus} handleClick={openForm} />
            </SectionHeader.Container>

            <AccountList />

            {stateForm && <AccountCreateForm closeForm={closeForm} />}
        </>
    );
}
