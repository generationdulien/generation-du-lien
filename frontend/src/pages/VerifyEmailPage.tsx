import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail, resendVerification } from "../lib/api";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Alert, AlertDescription } from "../components/ui/alert";

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
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-6">
          {status === "waiting" && (
            <>
              <div className="text-6xl">📧</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Vérifiez votre email</h2>
                <p className="text-sm text-muted-foreground">
                  Un email de vérification a été envoyé à{" "}
                  <strong>{email || "votre adresse email"}</strong>. Cliquez sur le
                  lien pour confirmer votre inscription.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  Vous ne voyez pas l'email ? Vérifiez votre dossier spam ou réessayez.
                </p>
                <Button onClick={handleResend} variant="outline" className="w-full">
                  Renvoyer l'email
                </Button>
              </div>
            </>
          )}

          {status === "verified" && (
            <>
              <div className="text-6xl">✅</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-600">Email vérifié !</h2>
                <p className="text-sm text-muted-foreground">
                  Votre email a été confirmé avec succès. Vous pouvez maintenant vous
                  connecter à votre compte.
                </p>
              </div>
              <Link to="/auth/login" className="block">
                <Button className="w-full">Se connecter</Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-6xl">❌</div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Erreur de vérification</h2>
                  <Alert variant="destructive">
                    <AlertDescription>
                      {error || "Une erreur est survenue"}
                    </AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-2 pt-2">
                  {email && (
                    <Button onClick={handleResend} variant="outline" className="w-full">
                      Renvoyer l'email
                    </Button>
                  )}
                  <Link to="/" className="block">
                    <Button className="w-full">Retour à l'accueil</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
