import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { register as apiRegister } from "../lib/api.js";
import { Button } from "../components/Button.js";
import { Input } from "../components/Input.js";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            S'inscrire
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rejoignez Génération du Lien
          </p>
        </div>

        {apiError && (
          <div className="rounded-md bg-error-50 p-4">
            <p className="text-sm text-error-700">{apiError}</p>
          </div>
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

          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                {...register("terms")}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                J'accepte les{" "}
                <Link to="/terms" className="text-primary-600 hover:underline">
                  conditions d'utilisation
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-error-600">{errors.terms.message}</p>
            )}
          </div>

          {captchaError && (
            <div className="rounded-md bg-error-50 p-3">
              <p className="text-sm text-error-700">{captchaError}</p>
            </div>
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

        <p className="text-center text-sm text-gray-600">
          Déjà inscrit ?{" "}
          <Link to="/auth/login" className="text-primary-600 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
