import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";

const features = [
  {
    icon: "🤝",
    title: "Participation citoyenne",
    description:
      "Chaque citoyen a le droit de participer à l'élaboration des politiques publiques.",
  },
  {
    icon: "🎯",
    title: "Transparence",
    description:
      "Nos débats et décisions sont ouverts et accessibles à tous.",
  },
  {
    icon: "🌱",
    title: "Durabilité",
    description:
      "Nous construisons des solutions durables pour les générations futures.",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Ensemble pour notre avenir
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Participez à la construction de notre programme politique. Votre voix compte.
            </p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/topics">
              <Button size="lg" className="px-8">
                Découvrir le programme
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" size="lg" className="px-8">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              À propos du mouvement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Génération du Lien est une initiative citoyenne pour une démocratie
              participative plus proche, plus inclusive et plus efficace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="text-5xl">{feature.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Rejoignez le mouvement</h2>
            <p className="text-lg opacity-90">
              Inscrivez-vous pour participer à nos consultations et contribuer à notre programme.
            </p>
          </div>
          <Link to="/auth/register">
            <Button variant="secondary" size="lg" className="px-8">
              S'inscrire gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
