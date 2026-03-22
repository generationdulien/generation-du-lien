import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login as apiLogin } from "../lib/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardHeader, CardContent } from "../components/Card";
import { Alert, AlertDescription } from "../components/ui/alert";

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
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Se connecter</h2>
          <p className="text-sm text-muted-foreground">
            Accédez à votre compte Génération du Lien
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {apiError && (
            <Alert variant="destructive">
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
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

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore inscrit ?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
