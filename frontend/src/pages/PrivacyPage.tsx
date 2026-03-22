export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Politique de confidentialité
      </h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p>
            Génération du Lien (« nous », « notre ») s'engage à protéger votre vie privée.
            Cette politique de confidentialité explique comment nous collectons, utilisons,
            divulguons et sauvegardons vos informations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Informations que nous collectons
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Informations d'identification</strong> : Nom, prénom, email, mot de
              passe (hashé)
            </li>
            <li>
              <strong>Informations de participation</strong> : Contributions, commentaires,
              votes
            </li>
            <li>
              <strong>Données techniques</strong> : Adresse IP, navigateur, appareil
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation des données</h2>
          <p>
            Vos informations sont utilisées pour :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fournir et améliorer nos services</li>
            <li>Communiquer avec vous</li>
            <li>Assurer la sécurité et la conformité légale</li>
            <li>Analyser et améliorer notre plateforme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sécurité</h2>
          <p>
            Nous utilisons des mesures de sécurité appropriées pour protéger vos informations
            personnelles contre l'accès, la modification ou la divulgation non autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
          <p>
            Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles.
            Pour exercer ces droits, contactez-nous à contact@generationdulien.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Modifications</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité. Les modifications
            seront affichées sur cette page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant cette politique, contactez-nous à :
            <br />
            contact@generationdulien.fr
          </p>
        </section>
      </div>
    </div>
  );
}
