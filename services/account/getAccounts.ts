import { axios } from "../../lib/axios";

export interface getAccountsOutput {
    id: string;
    name: string;
}

export async function getAccounts(): Promise<getAccountsOutput[] | null> {
    const response = await axios.get("/accounts");
    if (response.status === 200) return await response.data;
    return null;
}
