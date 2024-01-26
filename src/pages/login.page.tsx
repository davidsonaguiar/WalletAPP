import { redirect, useNavigate } from "react-router-dom";
import { AuthenticateRequest } from "../models/user.model";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../hooks/useAuhentication";
import { useEffect } from "react";

function LoginPage() {

  const { register, handleSubmit } = useForm<AuthenticateRequest>();
  const { isAuthenticaded, isLoading, signIn } = useAuthentication();
  const navigation = useNavigate();

  function handleSubmitForm(data: AuthenticateRequest) {
    signIn(data.email, data.password);
  }

  useEffect(() => {
    if(isAuthenticaded) navigation("/");
  }, [isAuthenticaded]);

  console.log(isAuthenticaded)

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
            id="login"
            className="login-form-input"
            disabled={isLoading}
          />
          <label htmlFor="password" className="login-form-label">
            PASSWORD
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className="login-form-input"
            disabled={isLoading}
          />
          <button type="submit" className="login-form-button" disabled={isLoading}>
            ENTRAR
          </button>
        </form>
        <span className="login-or">OU</span>
        <button className="login-button-register" type="button" disabled={isLoading}>
          REGISTRE-SE
        </button>
        <div className="login-border-bottom"></div>
      </div>
    </>
  );
}

export default LoginPage;
