import { Link } from "react-router-dom";
import { Button } from "../components/Button.js";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ensemble pour notre avenir
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Participez à la construction de notre programme politique. Votre voix compte.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/topics">
              <Button size="lg">Découvrir le programme</Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" size="lg">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              À propos du mouvement
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Génération du Lien est une initiative citoyenne pour une démocratie
              participative plus proche, plus inclusive et plus efficace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez le mouvement</h2>
          <p className="text-lg mb-8 opacity-90">
            Inscrivez-vous pour participer à nos consultations et contribuer à notre programme.
          </p>
          <Link to="/auth/register">
            <Button variant="secondary" size="lg">
              S'inscrire gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
