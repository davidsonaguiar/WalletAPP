import { Toaster } from "sonner";
import Button from "../components/button";
import { ErrorInput } from "../components/error.input";
import { Form } from "../components/form";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { RegisterRequest } from "../models/user.model";
import { useAuthentication } from "../hooks/useAuhentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {

  const navigation = useNavigate();
  const { signUp } = useAuthentication();
  const { isLoading, isAuthenticaded } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  useEffect(() => {
    if (isAuthenticaded) navigation("/dashboard");
  }, [isAuthenticaded])
  
  return(
    <>
      <div className="w-full px-10 bg-zinc-900 border borde-zinc-500 sm:max-w-lg">
        <h1 className="w-full h-16 px-3 bg-zinc-900 border border-zinc-500 text-zinc-300 text-xl font-bold tracking-wider flex items-center">
          REGISTRE-SE
        </h1>
        <Form action="" onSubmit={handleSubmit(signUp)}>
          <Label htmlFor="login" className="login-form-label">
            NOME
          </Label>
          <Input
            type="text"
            label="name"
            register={register}
            id="name"
            required
            disabled={isLoading}
            placeholder="Joao da Silva"
          />
          {errors.email?.message && (
            <ErrorInput message={errors.email.message} />
          )}
          <Label htmlFor="password">EMAIL</Label>
          <Input
            type="email"
            label="email"
            required
            register={register}
            id="email"
            disabled={isLoading}
            placeholder="email@exemple.com"
          />
          {errors.password?.message && (
            <ErrorInput message={errors.password?.message} />
          )}
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            type="password"
            label="password"
            required
            register={register}
            id="password"
            disabled={isLoading}
            placeholder="********"
          />
          {errors.password?.message && (
            <ErrorInput message={errors.password?.message} />
          )}
          <Button type="submit" disabled={isLoading}>
            REGISTRAR
          </Button>
        </Form>
        <div className="w-full h-10 bg-zinc-900 text-zinc-300 border border-zinc-500 flex justify-center items-center"></div>
      </div>
      <Toaster position="top-right" duration={5000} />
    </>
  );
}