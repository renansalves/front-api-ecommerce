import { type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "../../components/BrandMark";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import "../../services/axiosDef";
import axiosDef, { axiosLogin } from "../../services/axiosDef";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage(): JSX.Element {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { toast, show, hide } = useToast();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axiosDef.post("api/users/login", data);

      show("Usuário logado com sucesso!");
      reset();
      navigate("/product/list")
      const jwtToken = response.data.token;
      setCookie('jwt-token', jwtToken, 1); // Set the cookie for 1 day

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("email", { type: "manual", message: "E-mail ou senha invalidos." });
        setError("password", { type: "manual", message: " " })
        show("E-mail ou senha inválidos.", "error");
      } else {
        show("Falha ao conectar. Tente novamente.", "error");
      }
    }
    return;
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">

      <div className="sm:flex-row">
        <BrandMark />
      </div>
      <div className="flex justify-center items-center flex-1 py-10 px-6" >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow"
        >
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Login</h1>

          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            {...register("email")}
            type="email"
            placeholder="usuario@email.com"
            className={`mt-1 mb-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
              }`}
          />
          {errors.email && (
            <p className="mb-2 text-xs text-red-600">{errors.email.message}</p>
          )}

          <label className="mt-3 block text-sm font-medium text-gray-700">Senha</label>
          <div className={`mt-1 mb-1 flex rounded border focus-within:ring-2 ${errors.password ? "border-red-500 focus-within:ring-red-200" : "focus-within:ring-blue-500"
            }`}>
            <input
              {...register("password")}
              type="password"
              placeholder="********"
              className="w-full rounded-l px-3 py-2 focus:outline-none"
            />
          </div>
          {errors.password && (
            <p className="mb-2 text-xs text-red-600">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded bg-blue-600 py-2 text-white font-semibold transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? "Carregando..." : "Entrar"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link className="text-blue-600 hover:underline font-medium" to="/register">
              Cadastre-se
            </Link>
          </p>
        </form>
        <Toast
          message={toast.message}
          type={toast.type}
          open={toast.open}
          onClose={hide}
          autoHideMs={4000}
        />
      </div>
    </div >
  );
}
function setCookie(name: string, value: any, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
