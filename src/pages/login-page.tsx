import { useNavigate } from "react-router-dom";
import { Login } from "../models/user.model";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth/login";

function LoginPage() {
    const { register, handleSubmit } = useForm<Login>();
    const navigation = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            navigation("/");
        },
    });

    function handleSubmitForm(data: Login) {
        mutate(data);
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) navigation("/");
    }, []);

    return (
        <>
            <div className="login-container">
                <h1 className="login-title">Wallet Web</h1>
                <form action="" className="login-form" onSubmit={handleSubmit(handleSubmitForm)}>
                    <label htmlFor="login" className="login-form-label">
                        LOGIN
                    </label>
                    <input
                        type="text"
                        {...register("email", { required: true })}
                        id="email"
                        name="email"
                        className="login-form-input"
                        disabled={isPending}
                    />
                    <label htmlFor="password" className="login-form-label">
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        id="password"
                        name="password"
                        className="login-form-input"
                        disabled={isPending}
                    />
                    <button type="submit" className="login-form-button" disabled={isPending}>
                        ENTRAR
                    </button>
                </form>
                <span className="login-or">OU</span>
                <button
                    className="login-button-register"
                    type="button"
                    disabled={isPending}
                    onClick={() => navigation("/register")}
                >
                    REGISTRE-SE
                </button>
                <div className="login-border-bottom"></div>
            </div>
        </>
    );
}

export default LoginPage;
