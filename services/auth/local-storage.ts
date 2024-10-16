import { UserWhithoutPassword } from "../../src/models/user.model";

export function saveUserLocalStorage(user: UserWhithoutPassword) {
    if(!user) return;
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage(): UserWhithoutPassword | null {
    const storagedUser = localStorage.getItem("user");
    if (!storagedUser) return null;
    return JSON.parse(storagedUser);
}

export function removeUserLocalStorage(): void {
    localStorage.removeItem("user");
}
