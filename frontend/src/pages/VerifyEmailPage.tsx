import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail, resendVerification } from "../lib/api.js";
import { Button } from "../components/Button.js";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"waiting" | "verified" | "error">(
    "waiting"
  );
  const [email] = useState(searchParams.get("email") || "");
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    async function verifyToken() {
      if (!token) return;

      try {
        const response = await verifyEmail(token);
        if (response.success) {
          setStatus("verified");
        } else {
          setStatus("error");
          setError(response.error?.message || "Erreur lors de la vérification");
        }
      } catch (err) {
        setStatus("error");
        setError("Erreur lors de la vérification");
      }
    }

    verifyToken();
  }, [token]);

  const handleResend = async () => {
    if (!email) return;
    try {
      const response = await resendVerification(email);
      if (response.success) {
        setStatus("waiting");
        setError(null);
      } else {
        setStatus("error");
        setError(response.error?.message || "Erreur lors de l'envoi");
      }
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        {status === "waiting" && (
          <>
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vérifiez votre email
            </h2>
            <p className="text-gray-600 mb-6">
              Un email de vérification a été envoyé à{" "}
              <strong>{email || "votre adresse email"}</strong>. Cliquez sur le
              lien pour confirmer votre inscription.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Vous ne voyez pas l'email ? Vérifiez votre dossier spam ou
                réessayez.
              </p>
              <Button
                onClick={handleResend}
                variant="outline"
              >
                Renvoyer l'email
              </Button>
            </div>
          </>
        )}

        {status === "verified" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Email vérifié !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre email a été confirmé avec succès. Vous pouvez maintenant vous
              connecter à votre compte.
            </p>
            <Link to="/auth/login">
              <Button>Se connecter</Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-3xl font-bold text-error-600 mb-4">
              Erreur de vérification
            </h2>
            <p className="text-gray-600 mb-6">{error || "Une erreur est survenue"}</p>
            <div className="space-y-4">
              {email && (
                <Button
                  onClick={handleResend}
                  variant="outline"
                >
                  Renvoyer l'email
                </Button>
              )}
              <Link to="/">
                <Button>Retour à l'accueil</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
