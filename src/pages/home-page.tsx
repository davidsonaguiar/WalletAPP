import Button from "../components/Button/index.tsx";
import SectionHeader from "../components/SectionHeader/index.tsx";
import TransactionTable from "../components/TransactionTable/index.tsx";
import TransactionRegister from "../components/TransactionRegister.tsx/index.tsx";
import { axios } from "../../lib/axios.ts";
import ModalAddAccount from "../components/ModalAddAccount/index.tsx";
import ModalAddTransaction from "../components/ModalAddTransaction/index.tsx";
import ModalEditTransaction from "../components/ModalEditTransaction/index.tsx";
import ModadAddCategory from "../components/ModalAddCategory/index.tsx";
import ModalImportTransaction from "../components/ModalImportTransaction/index.tsx";
import { useEffect, useState, FormEvent } from "react";
import { AiOutlineImport, AiOutlinePlus } from "react-icons/ai";
import { Account, Transaction } from "../types/index.ts";
import { BiCategory } from "react-icons/bi";
import AccountList from "../components/account-list.tsx";
import AccountSection from "../components/account-section.tsx";

type AccountList = {
    id: string;
    name: string;
    value: number;
};

type StateType = {
    accounts: AccountList[];
    transactions: Transaction[];
    import: boolean;
    addAccount: boolean;
    addCategory: boolean;
    editAccount: boolean;
    addTransaction: boolean;
    editTransaction: {
        open: boolean;
        transaction?: Transaction;
    };
};

const initialState = {
    accounts: [],
    transactions: [],
    import: false,
    addAccount: false,
    addCategory: false,
    editAccount: false,
    addTransaction: false,
    editTransaction: {
        open: false,
        transaction: undefined,
    },
};

function HomePage() {
    const [state, setState] = useState<StateType>(initialState);

    async function getTransactions() {
        const responseTransaction = await axios.get("/transactions");
        const responseAccount = await axios.get("/accounts");

        if (responseTransaction.status === 200 && responseAccount.status === 200) {
            const dataAccount = await responseAccount.data;
            const dataTransaction: Transaction[] = await responseTransaction.data;
            const accounts: AccountList[] = dataAccount.map((account: Account) => {
                const accountValue = dataTransaction.reduce(
                    (acc: number, transaction: Transaction) => {
                        if (transaction.account.name === account.name) {
                            return transaction.category.type === "Ganhos"
                                ? acc + transaction.value
                                : acc - transaction.value;
                        } else {
                            return acc;
                        }
                    },
                    0
                );
                return { ...account, value: accountValue };
            });

            setState((prev) => ({
                ...prev,
                transactions: dataTransaction,
                accounts,
            }));
        } else {
            console.log("Error", responseTransaction.statusText);
        }
    }

    function addAccount(event?: FormEvent) {
        event && event.preventDefault();
        setState((prev) => ({
            ...prev,
            addAccount: !prev.addAccount,
        }));
    }

    function editAccount(status: boolean) {
        setState((prev) => ({
            ...prev,
            editAccount: status,
        }));
    }

    function addTransaction(event?: FormEvent) {
        event && event.preventDefault();
        setState((prev) => ({
            ...prev,
            addTransaction: !prev.addTransaction,
        }));
    }

    function editTransaction(open: boolean, transaction?: Transaction, event?: FormEvent) {
        event && event.preventDefault();
        setState((prev) => ({
            ...prev,
            editTransaction: {
                open,
                transaction,
            },
        }));
    }

    function addCategory(event?: FormEvent) {
        event && event.preventDefault();
        setState((prev) => ({
            ...prev,
            addCategory: !prev.addCategory,
        }));
    }

    function importTransaction(event?: FormEvent) {
        event && event.preventDefault();
        setState((prev) => ({
            ...prev,
            import: !prev.import,
        }));
    }

    return (
        <>
            <AccountSection />
            <SectionHeader.Container>
                <SectionHeader.Title text="Minhas Transações" />
                <div className="section-header-buttons">
                    <Button
                        text="Importar"
                        icon={AiOutlineImport}
                        handleClick={importTransaction}
                    />
                    <Button text="Categorias" icon={BiCategory} handleClick={addCategory} />
                    <Button text="Transação" icon={AiOutlinePlus} handleClick={addTransaction} />
                </div>
            </SectionHeader.Container>
            <TransactionTable>
                {state.transactions.map((transaction) => (
                    <TransactionRegister
                        key={transaction.id}
                        transaction={transaction}
                        handleClick={editTransaction}
                    />
                ))}
            </TransactionTable>
            { state.addCategory && <ModadAddCategory handleClick={addCategory} />}
            <ModalAddAccount visible={state.addAccount} handleClick={addAccount} />
            <ModalAddTransaction
                visible={state.addTransaction}
                accounts={state.accounts}
                handleClick={addTransaction}
            />
            <ModalImportTransaction
                visible={state.import}
                accounts={state.accounts}
                changeModal={importTransaction}
            />
            {state.editTransaction.transaction && (
                <ModalEditTransaction
                    accounts={state.accounts}
                    transaction={state.editTransaction.transaction}
                    handleClick={editTransaction}
                    visible={state.editTransaction.open}
                />
            )}
        </>
    );
}

export default HomePage;
