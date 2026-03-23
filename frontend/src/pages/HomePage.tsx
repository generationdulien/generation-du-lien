import { Link } from "react-router-dom";

const pillars = [
  {
    index: "01",
    title: "Participation Citoyenne",
    description:
      "Chaque voix compte dans la construction de notre programme. Vos idées deviennent notre politique.",
  },
  {
    index: "02",
    title: "Transparence Absolue",
    description:
      "Nos débats et décisions sont ouverts. La démocratie se nourrit de la lumière, pas de l'ombre.",
  },
  {
    index: "03",
    title: "Impact Durable",
    description:
      "Nous construisons des solutions pour les générations futures. L'urgence d'aujourd'hui, la sagesse de demain.",
  },
];

export function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0f", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Ghost background word */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22vw",
              fontWeight: 400,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(37,99,235,0.12)",
              letterSpacing: "-0.05em",
              userSelect: "none",
            }}
          >
            LIEN
          </span>
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Main content */}
            <div className="lg:col-span-8 space-y-8 hero-content">

              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-3 opacity-0"
                style={{ animation: "fadeUp 0.8s ease forwards 0.1s" }}
              >
                <div style={{ width: "32px", height: "1px", backgroundColor: "#2563eb" }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#2563eb",
                  }}
                >
                  Initiative Citoyenne — 2026
                </span>
              </div>

              {/* Title */}
              <h1
                className="opacity-0"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)",
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                  animation: "fadeUp 0.9s ease forwards 0.25s",
                }}
              >
                Ensemble
                <br />
                <em style={{ color: "#2563eb", fontStyle: "italic" }}>pour notre</em>
                <br />
                Avenir
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl leading-relaxed max-w-xl opacity-0"
                style={{
                  color: "rgba(240,240,240,0.55)",
                  fontWeight: 300,
                  animation: "fadeUp 0.9s ease forwards 0.45s",
                }}
              >
                Participez à la construction d'un programme politique ancré dans la réalité
                citoyenne. Votre engagement façonne demain.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-4 pt-2 opacity-0"
                style={{ animation: "fadeUp 0.9s ease forwards 0.6s" }}
              >
                <Link
                  to="/topics"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1d4ed8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2563eb")
                  }
                >
                  <span>Découvrir le Programme</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-300"
                  style={{
                    border: "1px solid rgba(240,240,240,0.18)",
                    color: "#f0f0f0",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2563eb";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(240,240,240,0.18)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#f0f0f0";
                  }}
                >
                  <span>S'inscrire</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Right panel — decorative stats */}
            <div
              className="lg:col-span-4 hidden lg:flex flex-col gap-4 opacity-0"
              style={{ animation: "fadeLeft 1s ease forwards 0.7s" }}
            >
              {[
                { value: "∞", label: "Voix à porter" },
                { value: "3", label: "Piliers fondateurs" },
                { value: "1", label: "Objectif commun" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 transition-all duration-400"
                  style={{
                    border:
                      i === 0
                        ? "1px solid rgba(37,99,235,0.3)"
                        : "1px solid rgba(240,240,240,0.07)",
                    backgroundColor:
                      i === 0 ? "rgba(37,99,235,0.06)" : "transparent",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "3rem",
                      fontWeight: 400,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                      color: i === 0 ? "#2563eb" : "#f0f0f0",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(240,240,240,0.4)",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.3, animation: "fadeUp 1s ease forwards 1.2s" }}
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, transparent, rgba(240,240,240,0.6))",
            }}
          />
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(37,99,235,0.35), transparent)",
          }}
        />
      </div>

      {/* ── PILIERS ──────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section header */}
          <div className="mb-20 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div style={{ width: "32px", height: "1px", backgroundColor: "#2563eb" }} />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#2563eb",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Nos Fondements
              </span>
            </div>
            <p
              style={{
                color: "rgba(240,240,240,0.25)",
                fontSize: "0.85rem",
                fontWeight: 300,
                textAlign: "right",
                maxWidth: "180px",
                lineHeight: 1.6,
              }}
            >
              Trois valeurs,<br />une vision
            </p>
          </div>

          {/* Pillar rows */}
          <div>
            {pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 transition-all duration-500 cursor-default"
                style={{ borderTop: "1px solid rgba(240,240,240,0.06)", paddingLeft: "0" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "1.25rem";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "rgba(37,99,235,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                }}
              >
                <div className="md:col-span-1 flex items-start pt-1">
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.25rem",
                      color: "rgba(240,240,240,0.2)",
                    }}
                  >
                    {pillar.index}
                  </span>
                </div>
                <div className="md:col-span-5 flex items-center">
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 400,
                      lineHeight: 1.1,
                      color: "#f0f0f0",
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <div className="md:col-span-5 flex items-center">
                  <p
                    style={{
                      color: "rgba(240,240,240,0.45)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      fontSize: "0.95rem",
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
                <div className="md:col-span-1 hidden md:flex items-center justify-end">
                  <span
                    className="transition-all duration-300 translate-x-[-8px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: "#2563eb", fontSize: "1.25rem" }}
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
            <div style={{ height: "1px", backgroundColor: "rgba(240,240,240,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ backgroundColor: "rgba(37,99,235,0.04)" }}
      >
        {/* Ghost text */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-end"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "15vw",
              fontWeight: 400,
              color: "transparent",
              WebkitTextStroke: "1px rgba(37,99,235,0.07)",
              paddingRight: "3rem",
              lineHeight: 1,
            }}
          >
            ENSEMBLE
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl space-y-8">
            <div className="flex items-center gap-4">
              <div style={{ width: "32px", height: "1px", backgroundColor: "#2563eb" }} />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#2563eb",
                }}
              >
                Notre Mission
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Une démocratie plus proche,{" "}
              <em style={{ color: "#2563eb", fontStyle: "italic" }}>plus inclusive</em>,{" "}
              plus efficace.
            </h2>
            <p
              style={{
                color: "rgba(240,240,240,0.5)",
                lineHeight: 1.8,
                fontWeight: 300,
                fontSize: "1rem",
              }}
            >
              Génération du Lien est une initiative citoyenne qui croit que la politique se construit
              avec les gens, pas pour les gens. Chaque citoyen possède une expertise — celle de sa
              propre vie — et cette expertise doit nourrir nos décisions collectives.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div style={{ width: "48px", height: "1px", backgroundColor: "rgba(37,99,235,0.4)" }} />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#2563eb",
                }}
              >
                Rejoindre le Mouvement
              </span>
              <div style={{ width: "48px", height: "1px", backgroundColor: "rgba(37,99,235,0.4)" }} />
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              Votre voix{" "}
              <em style={{ color: "#2563eb", fontStyle: "italic" }}>compte.</em>
            </h2>
            <p
              style={{
                color: "rgba(240,240,240,0.45)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              Inscrivez-vous pour participer à nos consultations et contribuer à l'élaboration de
              notre programme politique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 transition-all duration-300"
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1d4ed8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2563eb")
              }
            >
              S'inscrire gratuitement →
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 transition-all duration-300"
              style={{
                border: "1px solid rgba(240,240,240,0.15)",
                color: "rgba(240,240,240,0.6)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2563eb";
                (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(240,240,240,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,240,0.6)";
              }}
            >
              Voir le programme
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        className="py-8"
        style={{ borderTop: "1px solid rgba(240,240,240,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span
            style={{
              fontSize: "0.8rem",
              color: "rgba(240,240,240,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 Génération du Lien
          </span>
          <div
            className="flex gap-6 text-sm"
            style={{ color: "rgba(240,240,240,0.25)" }}
          >
            <Link
              to="/mentions"
              className="transition-colors duration-200 hover:text-white"
              style={{ fontSize: "0.8rem", letterSpacing: "0.03em" }}
            >
              Mentions légales
            </Link>
            <Link
              to="/privacy"
              className="transition-colors duration-200 hover:text-white"
              style={{ fontSize: "0.8rem", letterSpacing: "0.03em" }}
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
