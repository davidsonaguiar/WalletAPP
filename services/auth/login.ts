import { axios } from "../../lib/axios";

export interface LoginInput {
    email: string;
    password: string;
}

export async function login(input: LoginInput) {
    try {
        const response = await axios.post("/users/login", input);
        if (response.status === 200) return response.data;
    } catch (error) {
        console.log("Erro no login: ", error);
    }
}
