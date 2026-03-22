import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login as apiLogin } from "../lib/api.js";
import { Button } from "../components/Button.js";
import { Input } from "../components/Input.js";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est obligatoire"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await apiLogin(data);

      if (response.success && response.data) {
        // Store token in localStorage
        const data = response.data as { token: string; id: string };
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.id);
        // Redirect to dashboard (Phase 2)
        navigate("/");
      } else {
        setApiError(response.error?.message || "Erreur lors de la connexion");
      }
    } catch (err) {
      setApiError("Erreur lors de la connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Se connecter
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accédez à votre compte Génération du Lien
          </p>
        </div>

        {apiError && (
          <div className="rounded-md bg-error-50 p-4">
            <p className="text-sm text-error-700">{apiError}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="jean@example.com"
          />

          <Input
            label="Mot de passe"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">
                Se souvenir de moi
              </span>
            </label>
            <a href="#" className="text-sm text-primary-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Se connecter
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Pas encore inscrit ?{" "}
          <Link to="/auth/register" className="text-primary-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
