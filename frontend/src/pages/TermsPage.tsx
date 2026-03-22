export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Conditions d'utilisation
      </h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant Génération du Lien, vous acceptez de respecter ces
            conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas
            utiliser cette plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Licence d'utilisation</h2>
          <p>
            Nous vous accordons une licence limitée, non exclusive et révocable pour accéder
            et utiliser cette plateforme à des fins personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Interdictions</h2>
          <p>Vous n'êtes pas autorisé à :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modifier ou copier le contenu de la plateforme</li>
            <li>Utiliser la plateforme à des fins commerciales non autorisées</li>
            <li>Accéder à la plateforme par des moyens automatisés</li>
            <li>Publier du contenu offensant, illégal ou contraire aux règles</li>
            <li>Déranger ou harceler d'autres utilisateurs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contenu utilisateur</h2>
          <p>
            En publiant du contenu sur la plateforme, vous déclarez qu'il est legal, original
            et que vous possédez tous les droits nécessaires. Nous nous réservons le droit
            de modérer ou de supprimer tout contenu qui viole ces conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation de responsabilité</h2>
          <p>
            La plateforme est fournie « telle quelle ». Nous ne garantissons pas l'absence
            d'erreurs ou d'interruptions. À l'exception des cas prévus par la loi, nous ne
            serons pas responsables des dommages indirects ou consécutifs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les
            modifications sont effectives dès publication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
          <p>
            Ces conditions sont régies par les lois de France. Tout litige sera soumis à la
            juridiction des tribunaux compétents de France.
          </p>
        </section>
      </div>
    </div>
  );
}
