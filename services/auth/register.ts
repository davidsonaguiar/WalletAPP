import { axios } from "../../lib/axios";

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export async function register(input: RegisterInput) {
    try {
        const response = await axios.post("/users/register", input);
        if (response.status === 201) return response.data;
    }
    catch (error) {
        console.log("Erro no registro: ", error);
    }
}