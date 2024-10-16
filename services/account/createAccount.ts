import { axios } from "../../lib/axios";

export interface CreateAccountInput {
    name: string;
}

export async function createAccount(input: CreateAccountInput) {
    const response = await axios.post("/accounts", input);
    if (response.status === 200) return await response.data;
    return null;
}
