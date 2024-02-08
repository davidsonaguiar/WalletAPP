import { useNavigate } from "react-router-dom";
import { AuthenticateRequest } from "../models/user.model";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../hooks/useAuhentication";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Form } from "../components/form";
import Button from "../components/button";
import { ErrorInput } from "../components/error.input";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateRequest>();
  const { isAuthenticaded, isLoading, signIn } = useAuthentication();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticaded) navigation("/dashboard");
  }, [isAuthenticaded]);

  return (
    <>
      <div className="w-full px-10 bg-zinc-900 border borde-zinc-500 sm:max-w-lg">
        <h1 className="w-full h-16 px-3 bg-zinc-900 border border-zinc-500 text-zinc-300 text-xl font-bold tracking-wider flex items-center">
          LOGIN
        </h1>
        <Form action="" onSubmit={handleSubmit(signIn)}>
          <Label htmlFor="login" className="login-form-label">
            EMAIL
          </Label>
          <Input
            type="text"
            label="email"
            register={register}
            id="login"
            required
            disabled={isLoading}
            placeholder="exemple@email.com"
          />
          {errors.email?.message && (
            <ErrorInput message={errors.email.message} />
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
            ENTRAR
          </Button>
        </Form>
        <div className="w-full h-10 bg-zinc-900 text-zinc-300 border border-zinc-500 flex justify-center items-center"></div>
      </div>
      <Toaster position="top-right" duration={5000} />
    </>
  );
}

export default LoginPage;
