import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { BrandMark } from "../../components/BrandMark";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import axiosDef from "../../services/axiosDef";

const registerSchema = z.object({
  name: z.string().min(3, "O nome completo deve ser informado"),
  email: z.email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});
type LoginFormData = z.infer<typeof registerSchema>;

export function RegisterPage(): JSX.Element {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { toast, show, hide } = useToast();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const registerData = {
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "role": "CLIENTE"
      }
      await axiosDef.post("users/register", registerData);
      show("Usuario cadastrado com sucesso");
      reset();
      navigate("/login")
    } catch (err: any) {
      show("Erro ao cadastrar usuario", "error");
    }
    return;
  };

  return (

    <div className="flex flex-col bg-gray-50 min-h-screen">

      <div className="sm:flex-row">
        <BrandMark />
      </div>
      <div className="flex justify-center items-center flex-1 py-10 px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow"
        >
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Crie sua conta</h1>

          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Digite seu nome completo"
            className={`mt-1 mb-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
              }`}
          />
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
            Já tem uma conta?{" "}
            <Link className="text-blue-600 hover:underline font-medium" to="/login">
              Entrar
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
