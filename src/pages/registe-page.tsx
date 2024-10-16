import { useNavigate } from "react-router-dom";
import { register as registeUser, RegisterInput } from "../../services/auth/register";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterInput>();

    const { mutate, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: registeUser,
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            navigate("/");
        },
    });

    async function handleSubmitForm(data: RegisterInput) {
        mutate(data);
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Wallet Web</h1>
            <form action="" className="login-form" onSubmit={handleSubmit(handleSubmitForm)}>
                <label htmlFor="name" className="login-form-label">
                    NAME
                </label>
                <input
                    type="text"
                    id="name"
                    className="login-form-input"
                    {...register("name", { required: true })}
                    disabled={isPending}
                />
                <label htmlFor="login" className="login-form-label">
                    EMAIL
                </label>
                <input
                    type="text"
                    id="login"
                    className="login-form-input"
                    {...register("email", { required: true })}
                    disabled={isPending}
                />
                <label htmlFor="password" className="login-form-label">
                    PASSWORD
                </label>
                <input
                    type="password"
                    id="password"
                    className="login-form-input"
                    {...register("password", { required: true })}
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
                onClick={() => navigate("/login")}
                disabled={isPending}
            >
                LOGIN
            </button>
            <div className="login-border-bottom"></div>
        </div>
    );
}

export default RegisterPage;
