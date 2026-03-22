import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { register as apiRegister } from "../lib/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardHeader, CardContent } from "../components/Card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Label } from "../components/ui/label";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "Le prénom est obligatoire"),
    lastName: z.string().min(1, "Le nom est obligatoire"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    terms: z.literal<boolean>(true, {
      errorMap: () => ({ message: "Vous devez accepter les conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const hcaptchaRef = useRef<HCaptcha>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setCaptchaError(null);
    setIsLoading(true);
    setApiError(null);

    try {
      // Get CAPTCHA token
      const captchaToken = hcaptchaRef.current?.getResponse();

      if (!captchaToken) {
        setCaptchaError("Veuillez compléter le CAPTCHA");
        setIsLoading(false);
        return;
      }

      const response = await apiRegister({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        captchaToken: captchaToken,
      });

      if (response.success) {
        // Redirect to verification email page
        navigate(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        setApiError(response.error?.message || "Erreur lors de l'inscription");
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
          <h2 className="text-2xl font-bold tracking-tight">S'inscrire</h2>
          <p className="text-sm text-muted-foreground">Rejoignez Génération du Lien</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {apiError && (
            <Alert variant="destructive">
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prénom"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="Jean"
              />
              <Input
                label="Nom"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="Dupont"
              />
            </div>

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

            <Input
              label="Confirmer le mot de passe"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              placeholder="••••••••"
            />

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="peer relative h-4 w-4 shrink-0 rounded border border-input cursor-pointer"
                  {...register("terms")}
                />
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-xs text-destructive">{errors.terms.message}</p>
              )}
            </div>

            {captchaError && (
              <Alert variant="destructive">
                <AlertDescription>{captchaError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center">
              <HCaptcha
                ref={hcaptchaRef}
                sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                theme="light"
                size="normal"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              S'inscrire
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Déjà inscrit ?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
