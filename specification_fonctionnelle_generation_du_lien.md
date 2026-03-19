# Spécification fonctionnelle — Plateforme web « Génération du Lien »

## 1. Objet du document

Ce document définit les besoins fonctionnels d’une plateforme web moderne, responsive et accessible destinée au mouvement politique **Génération du Lien**, dans la perspective de la campagne des **élections législatives de 2027**.

La plateforme a pour objectif de :

- présenter publiquement le programme politique et ses thématiques ;
- permettre aux adhérents de réagir, commenter et proposer des contributions ;
- structurer une dynamique participative autour du programme ;
- fournir aux modérateurs et administrateurs des outils de gestion, validation et animation.

---

## 2. Contexte et vision

Le site doit être conçu comme une **plateforme politique participative** et non comme un simple site vitrine.

Il devra :

- être **accessible à tout le monde** pour la consultation du programme ;
- offrir un **espace adhérent sécurisé** ;
- permettre une **co-construction encadrée** du programme ;
- refléter une image **moderne, claire, crédible, inclusive et mobile-first** ;
- être capable d’évoluer jusqu’à la campagne des législatives 2027.

Le contenu éditorial s’appuie sur le programme « Génération du Lien », structuré en chapitres thématiques autour notamment de l’éducation, de la santé, de la démocratie, de l’écologie, de la culture, du numérique, de la justice sociale, des territoires, de la jeunesse et des libertés publiques.

---

## 3. Objectifs du projet

### 3.1 Objectifs politiques

- Rendre le programme lisible et accessible.
- Donner de la visibilité aux thématiques de campagne.
- Impliquer les adhérents dans la discussion et l’enrichissement du programme.
- Valoriser la participation citoyenne et militante.
- Structurer un dialogue entre base militante, experts, rédacteurs du programme et modération.

### 3.2 Objectifs numériques

- Proposer une expérience fluide sur **mobile, tablette et ordinateur**.
- Garantir un haut niveau de sécurité sur les comptes utilisateurs.
- Mettre en place des workflows de modération simples et robustes.
- Prévoir une architecture extensible pour de futures fonctionnalités.

---

## 4. Périmètre fonctionnel

Le périmètre cible couvre :

1. **Site public**
   - page d’accueil ;
   - présentation du mouvement ;
   - consultation des thématiques et propositions du programme ;
   - actualités, prises de position, appels à contribution ;
   - pages d’adhésion / inscription ;
   - formulaire de contact.

2. **Espace adhérent**
   - création de compte ;
   - connexion sécurisée ;
   - profil utilisateur ;
   - commentaires sur les thématiques ;
   - dépôt de contributions ;
   - suivi de ses interactions.

3. **Back-office modération / administration**
   - validation ou refus des commentaires ;
   - validation, classement ou archivage des contributions ;
   - gestion des thématiques ;
   - gestion des utilisateurs ;
   - gestion éditoriale de contenus.

---

## 5. Typologie des utilisateurs

### 5.1 Visiteur anonyme

Un visiteur non connecté peut :

- consulter librement les pages publiques ;
- lire les thématiques du programme ;
- consulter les contributions rendues publiques si cette option est activée ;
- accéder aux formulaires d’inscription et d’adhésion ;
- contacter le mouvement.

### 5.2 Adhérent / utilisateur inscrit

Un utilisateur authentifié peut :

- compléter son profil ;
- renseigner ses centres d’intérêt ;
- commenter une thématique ;
- proposer une contribution ;
- suivre le statut de ses publications ;
- modifier certaines informations de son compte.

### 5.3 Modérateur

Un modérateur peut :

- relire les commentaires avant publication ;
- approuver, refuser ou masquer des contenus ;
- signaler les abus ;
- gérer les files d’attente de modération ;
- consulter l’historique de modération.

### 5.4 Administrateur

Un administrateur peut :

- gérer l’ensemble des contenus, utilisateurs, rôles et paramètres ;
- créer ou modifier les thématiques ;
- gérer la structure éditoriale ;
- consulter les statistiques d’usage ;
- paramétrer les règles de modération et de sécurité.

---

## 6. Arborescence fonctionnelle cible

### 6.1 Front-office public

- Accueil
- Le mouvement
- Le programme
  - Liste des thématiques
  - Détail d’une thématique
  - Propositions associées
- Contributions citoyennes / militantes (optionnel selon validation)
- Actualités
- Participer
  - Adhérer
  - S’inscrire
  - Proposer une contribution
- Contact
- Mentions légales
- Politique de confidentialité
- CGU

### 6.2 Espace adhérent

- Tableau de bord
- Mon profil
- Mes centres d’intérêt
- Mes commentaires
- Mes contributions
- Notifications
- Paramètres du compte

### 6.3 Back-office

- Tableau de bord d’administration
- Modération des commentaires
- Modération des contributions
- Gestion des thématiques
- Gestion des utilisateurs
- Gestion éditoriale
- Paramètres
- Statistiques

---

## 7. Fonctionnalités détaillées

## 7.1 Consultation publique du programme

### Description
Le site doit permettre une lecture simple et structurée du programme politique.

### Besoins fonctionnels

- afficher les thématiques sous forme de cartes, listes ou rubriques ;
- permettre l’accès à une page détaillée par thématique ;
- afficher, pour chaque thématique :
  - un titre ;
  - une introduction ;
  - les constats ;
  - les priorités ;
  - les mesures ;
  - les contributions associées si publiées ;
  - les commentaires si rendus visibles ;
- permettre un classement ou filtrage par grand domaine ;
- proposer une recherche par mot-clé.

### Valeur attendue

Rendre le programme compréhensible, navigable et attractif pour un large public.

---

## 7.2 Gestion des thématiques

### Description
Le programme doit être structuré en thématiques éditoriales administrables.

### Besoins fonctionnels

- créer une thématique ;
- modifier une thématique ;
- publier ou dépublier une thématique ;
- ordonner les thématiques ;
- rattacher une contribution à une ou plusieurs thématiques ;
- associer des mots-clés ou tags à chaque thématique ;
- définir une image ou illustration de couverture.

### Exemples de thématiques issues du programme

- Éducation
- Santé
- Handicap et inclusion
- Culture
- Médias et information
- Numérique
- Jeunesse
- Petite enfance
- Justice
- Écologie
- Énergie
- Mobilités
- Démocratie
- Libertés fondamentales
- Fiscalité / finances publiques
- Outre-mer
- Recherche / universités

---

## 7.3 Inscription et création de compte

### Description
Le site doit permettre à un utilisateur de créer un compte de manière sécurisée.

### Parcours cible

1. L’utilisateur clique sur « S’inscrire ».
2. Il renseigne :
   - prénom ;
   - nom ;
   - email ;
   - mot de passe ;
   - confirmation du mot de passe ;
   - acceptation des CGU et de la politique de confidentialité.
3. Il passe un **CAPTCHA**.
4. Il reçoit un **email de vérification**.
5. Il clique sur le lien de validation.
6. Son compte est activé.
7. Il complète un **questionnaire sur ses centres d’intérêt**.

### Règles fonctionnelles

- l’email doit être unique ;
- le mot de passe doit respecter une politique de robustesse ;
- le compte ne doit pas être pleinement actif sans validation email ;
- le lien de vérification doit avoir une durée de validité limitée ;
- un mécanisme de renvoi d’email de confirmation doit être prévu.

---

## 7.4 Authentification et sécurité d’accès

### Besoins fonctionnels

- connexion par email / mot de passe ;
- fonctionnalité « mot de passe oublié » ;
- réinitialisation par email sécurisé ;
- déconnexion ;
- gestion de session ;
- journalisation des actions sensibles ;
- protection contre les tentatives répétées de connexion ;
- possibilité d’ajouter à terme une double authentification.

---

## 7.5 Questionnaire de centres d’intérêt

### Description
Lors de la première inscription, l’utilisateur doit pouvoir indiquer les sujets qui l’intéressent.

### Objectifs

- personnaliser son expérience ;
- orienter les notifications ;
- qualifier la communauté ;
- identifier les thématiques où il souhaite contribuer.

### Exemples de champs

- thématiques préférées ;
- volonté de commenter ;
- volonté de contribuer au programme ;
- intérêt pour l’animation locale ;
- compétences ou expertises déclaratives ;
- consentement à recevoir des communications ciblées.

### Règles fonctionnelles

- questionnaire modifiable depuis le profil ;
- réponses exploitables dans l’espace admin ;
- données traitées conformément au RGPD.

---

## 7.6 Commentaires sur les thématiques

### Description
Les adhérents peuvent réagir sur les sujets du programme via des commentaires.

### Principes de fonctionnement

- seuls les utilisateurs connectés peuvent commenter ;
- les commentaires sont soumis à **modération** avant publication ;
- un commentaire est rattaché à une thématique ;
- un utilisateur peut consulter le statut de son commentaire.

### Statuts possibles

- brouillon ;
- soumis ;
- en revue ;
- publié ;
- refusé ;
- masqué.

### Données d’un commentaire

- auteur ;
- date de soumission ;
- thématique concernée ;
- contenu ;
- statut ;
- motif éventuel de refus ;
- historique de modération.

### Règles de gestion

- le commentaire ne doit pas être visible publiquement avant validation ;
- le modérateur peut publier, refuser ou demander correction ;
- des règles anti-spam et anti-abus doivent être prévues ;
- possibilité de signalement par les administrateurs/modérateurs.

---

## 7.7 Contributions pour enrichir le programme

### Description
Les adhérents doivent pouvoir soumettre des contributions plus structurées qu’un simple commentaire.

### Cas d’usage

- proposer une idée nouvelle ;
- amender une proposition existante ;
- documenter un sujet par expertise ;
- remonter une problématique terrain ;
- partager une bonne pratique locale.

### Contenu attendu d’une contribution

- titre ;
- thématique principale ;
- éventuellement sous-thématique ;
- type de contribution ;
- résumé ;
- argumentaire détaillé ;
- sources ou références éventuelles ;
- pièces jointes éventuelles si la version cible le permet ;
- consentement sur les conditions de publication / réutilisation.

### Workflow

1. L’adhérent remplit un formulaire.
2. La contribution est enregistrée avec le statut « soumise ».
3. Le modérateur ou l’équipe programme l’examine.
4. Elle peut être :
   - publiée ;
   - classée sans suite ;
   - renvoyée pour complément ;
   - intégrée au travail de fond sans publication directe.

### Statuts possibles

- brouillon ;
- soumise ;
- en cours d’analyse ;
- retenue ;
- publiée ;
- refusée ;
- archivée.

---

## 7.8 Tableau de bord adhérent

### Description
Chaque utilisateur connecté dispose d’un espace personnel.

### Éléments affichés

- message de bienvenue ;
- résumé des thématiques suivies ;
- historique de ses commentaires ;
- historique de ses contributions ;
- statut des contenus envoyés ;
- notifications utiles ;
- liens rapides vers les actions principales.

---

## 7.9 Modération des contenus

### Description
Un back-office de modération est indispensable pour contrôler les commentaires et contributions.

### Fonctionnalités attendues

- file d’attente des contenus à traiter ;
- filtres par type, statut, date, thématique, auteur ;
- visualisation détaillée du contenu ;
- actions de validation/refus/archivage ;
- motif de refus interne ou externe ;
- historique des décisions ;
- possibilité de publier un contenu avec ou sans anonymisation partielle selon politique éditoriale.

### Exigences d’usage

- interface simple et rapide ;
- modération réalisable depuis un ordinateur et, si possible, depuis mobile ;
- traçabilité des décisions ;
- rôles différenciés entre modérateur et administrateur.

---

## 7.10 Gestion éditoriale

### Description
L’équipe doit pouvoir publier et mettre à jour des contenus éditoriaux.

### Contenus concernés

- pages institutionnelles ;
- présentation du mouvement ;
- éditos ;
- actualités ;
- appels à contribution ;
- pages de campagne ;
- FAQ.

### Fonctionnalités attendues

- éditeur de contenu ;
- planification de publication ;
- gestion des brouillons ;
- gestion des médias ;
- prévisualisation ;
- archivage.

---

## 7.11 Notifications et emails automatiques

### Emails transactionnels attendus

- confirmation d’inscription ;
- vérification d’email ;
- mot de passe oublié ;
- confirmation de soumission d’un commentaire ;
- confirmation de soumission d’une contribution ;
- notification de publication ou de refus.

### Notifications in-app possibles

- commentaire validé ;
- contribution traitée ;
- nouvelle sollicitation sur une thématique suivie ;
- appel à contribution.

---

## 7.12 Recherche et navigation

### Fonctionnalités attendues

- moteur de recherche par mot-clé ;
- filtre par thématique ;
- filtre par type de contenu ;
- navigation par tags ;
- contenus liés / suggestions.

---

## 8. Règles métier principales

1. Un visiteur non connecté ne peut pas commenter ni soumettre de contribution.
2. Un compte utilisateur doit être vérifié par email avant usage complet.
3. Tout commentaire est soumis à modération avant publication.
4. Toute contribution suit un workflow de traitement.
5. Un modérateur ne peut agir que dans le cadre de ses droits.
6. Un administrateur dispose des droits étendus de gestion.
7. Les données personnelles doivent être traitées conformément au RGPD.
8. Les contenus doivent pouvoir être rattachés à une ou plusieurs thématiques.
9. Les statuts des contenus doivent être visibles pour leur auteur.
10. Le site doit rester utilisable sur tous les formats d’écran.

---

## 9. Exigences non fonctionnelles

## 9.1 Responsive design

Le site doit être pleinement utilisable sur :

- smartphone ;
- tablette ;
- ordinateur.

Les parcours clés à optimiser en priorité sont :

- lecture d’une thématique ;
- inscription ;
- connexion ;
- dépôt de commentaire ;
- dépôt de contribution ;
- modération.

## 9.2 Accessibilité

Le site doit viser un bon niveau d’accessibilité numérique.

### Attendus

- contrastes lisibles ;
- navigation clavier ;
- hiérarchie claire des titres ;
- libellés de formulaires explicites ;
- compatibilité lecteurs d’écran autant que possible ;
- messages d’erreur compréhensibles.

## 9.3 Performance

- chargement rapide sur mobile ;
- optimisation des images ;
- pages thématiques performantes ;
- pagination ou chargement progressif des contenus longs.

## 9.4 Sécurité

- mots de passe chiffrés ;
- CAPTCHA à l’inscription ;
- validation email ;
- protection CSRF/XSS/SQLi selon bonnes pratiques ;
- gestion des rôles et permissions ;
- journalisation des actions sensibles ;
- sauvegardes régulières.

## 9.5 Conformité juridique

- RGPD ;
- consentement cookies si nécessaire ;
- mentions légales ;
- politique de confidentialité ;
- CGU ;
- gestion des droits d’auteur sur les contributions si publication.

---

## 10. Données principales à gérer

### 10.1 Utilisateur

- identifiant ;
- prénom ;
- nom ;
- email ;
- mot de passe chiffré ;
- date d’inscription ;
- statut du compte ;
- email vérifié ou non ;
- centres d’intérêt ;
- rôle ;
- consentements.

### 10.2 Thématique

- identifiant ;
- titre ;
- slug ;
- résumé ;
- contenu détaillé ;
- ordre d’affichage ;
- statut de publication ;
- tags ;
- illustration.

### 10.3 Commentaire

- identifiant ;
- auteur ;
- thématique ;
- contenu ;
- date de création ;
- statut ;
- historique de modération.

### 10.4 Contribution

- identifiant ;
- auteur ;
- titre ;
- type ;
- thématique ;
- résumé ;
- contenu ;
- pièces jointes éventuelles ;
- statut ;
- commentaires internes de modération.

### 10.5 Actualité / contenu éditorial

- identifiant ;
- titre ;
- catégorie ;
- contenu ;
- auteur ;
- date de publication ;
- statut.

---

## 11. Parcours utilisateurs clés

## 11.1 Parcours A — lecture publique du programme

1. Le visiteur arrive sur la page d’accueil.
2. Il accède à la rubrique « Programme ».
3. Il consulte la liste des thématiques.
4. Il ouvre une thématique.
5. Il lit les propositions.
6. Il est incité à s’inscrire pour réagir ou contribuer.

## 11.2 Parcours B — création de compte

1. L’utilisateur ouvre la page d’inscription.
2. Il complète le formulaire.
3. Il valide le CAPTCHA.
4. Il reçoit un email de confirmation.
5. Il clique sur le lien de vérification.
6. Il complète le questionnaire d’intérêt.
7. Il accède à son tableau de bord.

## 11.3 Parcours C — dépôt d’un commentaire

1. L’adhérent se connecte.
2. Il consulte une thématique.
3. Il clique sur « Réagir ».
4. Il saisit son commentaire.
5. Il soumet le commentaire.
6. Le commentaire passe en file de modération.
7. L’utilisateur voit le statut dans son espace personnel.

## 11.4 Parcours D — dépôt d’une contribution

1. L’adhérent se connecte.
2. Il clique sur « Proposer une contribution ».
3. Il remplit le formulaire structuré.
4. Il soumet sa proposition.
5. La contribution entre dans le workflow d’analyse.
6. L’utilisateur suit le statut depuis son tableau de bord.

## 11.5 Parcours E — modération

1. Le modérateur se connecte au back-office.
2. Il consulte la file d’attente.
3. Il ouvre un contenu.
4. Il valide, refuse ou archive.
5. Le statut est mis à jour.
6. L’auteur reçoit une notification si la règle est activée.

---

## 12. Priorisation fonctionnelle

## 12.1 MVP recommandé

Le premier lot devrait inclure :

- site public ;
- pages thématiques ;
- inscription avec email + mot de passe ;
- CAPTCHA ;
- vérification email ;
- questionnaire de centres d’intérêt ;
- espace adhérent simple ;
- commentaires avec modération ;
- contributions avec workflow basique ;
- back-office modération ;
- pages légales.

## 12.2 Lot 2

- actualités et CMS enrichi ;
- notifications avancées ;
- moteur de recherche plus puissant ;
- statistiques ;
- tags et recommandations ;
- pièces jointes sur contributions ;
- exports pour l’équipe programme.

## 12.3 Lot 3

- fonctionnalités communautaires avancées ;
- animation locale par territoire ;
- questionnaires ou consultations thématiques ;
- scoring d’intérêt / segmentation ;
- espace événementiel ;
- interfaçage CRM / emailing.

---

## 13. Indicateurs de succès

### Indicateurs d’audience

- nombre de visiteurs ;
- taux de consultation des thématiques ;
- temps moyen passé sur les pages programme.

### Indicateurs d’engagement

- nombre d’inscriptions ;
- taux de validation email ;
- nombre de commentaires soumis ;
- nombre de contributions soumises ;
- taux de participation par thématique.

### Indicateurs de modération

- délai moyen de traitement ;
- taux de publication ;
- taux de refus ;
- volume de contenus en attente.

### Indicateurs politiques / éditoriaux

- thématiques les plus consultées ;
- thématiques les plus contributives ;
- profils d’intérêt les plus représentés ;
- volume d’enrichissements repris dans le programme.

---

## 14. Recommandations UX/UI

Le site doit refléter une identité :

- moderne ;
- institutionnelle sans être froide ;
- engagée mais lisible ;
- inclusive ;
- simple à parcourir.

### Principes UX recommandés

- design épuré ;
- forte lisibilité du texte ;
- blocs thématiques bien hiérarchisés ;
- appels à l’action visibles ;
- parcours d’inscription courts ;
- feedback clair après chaque action ;
- navigation mobile prioritaire.

### Recommandations visuelles

- palette contemporaine et sobre ;
- iconographie simple ;
- mise en avant des thématiques ;
- valorisation des contributions sans surcharge ;
- attention particulière aux formats mobile et tablette.

---

## 15. Hypothèses et points à arbitrer

Les sujets suivants devront être confirmés en cadrage détaillé :

1. Le terme « adhésion » désigne-t-il une simple inscription plateforme ou une adhésion politique formelle ?
2. Les commentaires publiés seront-ils visibles publiquement ou uniquement entre adhérents ?
3. Les contributions retenues seront-elles publiées nominativement, anonymement ou éditorialisées ?
4. Faut-il prévoir un paiement en ligne pour l’adhésion ?
5. Faut-il distinguer plusieurs rôles internes : modérateur, équipe programme, administrateur, rédacteur ?
6. Souhaitez-vous une gestion multilingue à terme ?
7. Souhaitez-vous une interconnexion avec un outil emailing / CRM militant ?
8. Faut-il prévoir des espaces territoriaux ou fédérations locales ?

---

## 16. Conclusion

La plateforme « Génération du Lien » doit être pensée comme un **outil central de campagne, de participation et de structuration du programme**.

Elle devra combiner :

- une forte accessibilité publique ;
- une expérience adhérent simple et sécurisée ;
- une capacité réelle de contribution ;
- une modération fiable ;
- une présentation claire des thématiques du programme ;
- une qualité d’exécution compatible avec une montée en puissance jusqu’aux législatives de 2027.

Cette spécification constitue une base solide pour lancer :

- un cadrage produit ;
- un atelier UX ;
- une conception technique ;
- puis un découpage en lots de développement.
