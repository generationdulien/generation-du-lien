export function MentionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Identification de l'éditeur
          </h2>
          <p>
            <strong>Nom</strong> : Génération du Lien
            <br />
            <strong>Forme juridique</strong> : Association
            <br />
            <strong>Email</strong> : contact@generationdulien.fr
            <br />
            <strong>Adresse</strong> : À compléter
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le représentant légal de Génération du Lien.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Hébergement</h2>
          <p>
            <strong>Nom de l'hébergeur</strong> : À compléter
            <br />
            <strong>Adresse</strong> : À compléter
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Propriété intellectuelle
          </h2>
          <p>
            Le contenu de ce site (textes, images, vidéos, logos) est protégé par le droit
            d'auteur. Toute reproduction ou utilisation sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Données personnelles</h2>
          <p>
            Pour plus d'informations sur le traitement de vos données personnelles, consultez
            notre politique de confidentialité.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Accessibilité</h2>
          <p>
            Nous nous engageons à rendre ce site accessible à tous. Si vous rencontrez des
            difficultés d'accès, veuillez nous contacter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience. En continuant à
            naviguer, vous acceptez l'utilisation de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Responsabilité</h2>
          <p>
            Bien que nous mettions tout en œuvre pour assurer l'exactitude des informations,
            nous ne pouvons être tenus responsables des erreurs ou omissions.
          </p>
        </section>
      </div>
    </div>
  );
}
