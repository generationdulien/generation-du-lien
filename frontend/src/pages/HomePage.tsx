import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const features = [
  {
    number: "01",
    title: "Participation Citoyenne",
    description:
      "Chaque voix compte dans la construction de notre programme politique. Ensemble, nous façonnons l'avenir.",
  },
  {
    number: "02",
    title: "Transparence Absolue",
    description:
      "Nos débats et décisions sont ouverts. Voir comment nous délibérons, c'est comprendre nos valeurs.",
  },
  {
    number: "03",
    title: "Impact Durable",
    description:
      "Nous construisons des solutions qui perdurent. Pour aujourd'hui, pour demain, pour les générations futures.",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-48">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-900/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-8">
          <div className="space-y-8 md:space-y-12">
            {/* Tagline */}
            <div className="animate-fade-in-up animation-delay-1">
              <p className="font-body text-sm md:text-base tracking-widest text-slate-500 uppercase letter-spacing">
                Une Initiative Citoyenne
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up animation-delay-2 font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-tight">
              Ensemble pour notre
              <span className="block text-slate-400">Avenir</span>
            </h1>

            {/* Gold accent line */}
            <div className="animate-fade-in-up animation-delay-3 gold-accent"></div>

            {/* Subtitle */}
            <p className="animate-fade-in-up animation-delay-3 font-body text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Participez à la construction de notre programme politique. Votre voix compte dans la démocratie participative qui nous unit.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-3 flex gap-6 flex-wrap pt-8">
              <Link to="/topics">
                <Button
                  size="lg"
                  className="cta-button px-10 md:px-12 bg-slate-900 hover:bg-slate-800 text-white font-body font-medium"
                >
                  Découvrir le Programme
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="cta-button px-10 md:px-12 border-slate-300 text-slate-900 hover:bg-slate-50 font-body font-medium"
                >
                  S'inscrire Gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-20 md:mb-32 space-y-6">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-slate-900">
              Nos Piliers
            </h2>
            <div className="gold-accent"></div>
            <p className="font-body text-lg text-slate-600 max-w-2xl leading-relaxed">
              Génération du Lien repose sur trois valeurs fondamentales qui guident chacune de nos décisions et actions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.number}
                className="feature-card"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.15}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="relative group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8 md:p-10 h-full">
                  {/* Number accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-900/5 to-transparent rounded-bl-3xl group-hover:from-slate-900/10 transition-colors"></div>

                  {/* Content */}
                  <div className="relative space-y-6">
                    <p className="font-display text-5xl md:text-6xl font-bold text-slate-900/20">
                      {feature.number}
                    </p>
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="font-body text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 md:py-40 bg-slate-50">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-900/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center space-y-8">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-slate-900">
              À propos de Génération du Lien
            </h2>
            <div className="gold-accent"></div>
            <p className="font-body text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Nous croyons en une démocratie participative plus proche, plus inclusive et plus efficace.
              Chaque citoyen a le droit et la responsabilité de contribuer à l'élaboration des politiques
              publiques qui façonnent notre société.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Elegant background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-400 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-8 text-center space-y-10">
          <div className="space-y-6">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
              Prêt à Rejoindre le Mouvement?
            </h2>
            <p className="font-body text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Rejoignez des milliers de citoyens engagés qui façonnent le politique de demain. Votre inscription
              ne prend que quelques instants.
            </p>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="cta-button px-12 md:px-16 bg-white hover:bg-slate-50 text-slate-900 font-body font-semibold"
              >
                S'inscrire Maintenant
              </Button>
            </Link>
            <Link to="/topics">
              <Button
                variant="outline"
                size="lg"
                className="cta-button px-12 md:px-16 border-white text-white hover:bg-white/10 font-body font-semibold"
              >
                Voir le Programme
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer hint */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 font-body">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center text-sm">
          <p>© 2026 Génération du Lien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
