import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../../services/account/getAccounts";
import AccountCard from "./AccountCard";
import NoAccount from "./NoAccount";

export default function AccountList() {
    const { data, error, isLoading,  } = useQuery({
        queryKey: ["accounts"],
        queryFn: getAccounts,
    });

    if (isLoading) {
        return (
            <NoAccount
                title="Carregando..."
                text="Estamos buscando suas contas, aguarde um momento."
            />
        );
    }

    if (error) {
        return (
            <NoAccount
                title="Erro ao carregar contas"
                text="Ocorreu um erro ao buscar suas contas, atualize a pagina."
            />
        );
    }

    if (data && data.length === 0) {
        return (
            <NoAccount
                title="Nenhuma conta encontrada"
                text="Crie uma conta para começar a usar o Wallet Web."
            />
        );
    }

    return (
        <div className="account-list-container">
            <ul className="account-list-list">
                {data?.map((account) => (
                    <AccountCard
                        edit={() => ""}
                        key={account.id}
                        id={account.id}
                        title={account.name}
                        value={2000}
                    />
                ))}
            </ul>
        </div>
    );
}
