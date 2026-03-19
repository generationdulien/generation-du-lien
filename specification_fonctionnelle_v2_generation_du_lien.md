# Spécification Fonctionnelle – Version 2 (Cadrage Projet)
## Génération du Lien – Plateforme participative législatives 2027

---

## 1. Vision produit

Créer une plateforme politique participative, moderne et accessible permettant :
- De consulter le programme
- D’interagir (commentaires)
- De co-construire (contributions)
- De structurer une communauté engagée

---

## 2. Rôles utilisateurs

### 2.1 Visiteur
- Accès libre au contenu
- Consultation des thématiques
- Lecture des commentaires

### 2.2 Adhérent
- Création de compte sécurisé
- Commenter
- Proposer des contributions
- Gérer son profil

### 2.3 Modérateur
- Valider/refuser commentaires
- Valider/refuser contributions
- Gérer signalements

### 2.4 Administrateur
- Gérer thématiques
- Gérer utilisateurs
- Superviser modération

---

## 3. MVP (Minimum Viable Product)

### Fonctionnalités essentielles :
- Inscription + login sécurisé
- Validation email
- CAPTCHA
- Consultation du programme
- Commentaires modérés
- Dépôt de contributions
- Back-office modération simple

---

## 4. Backlog produit (User Stories)

### Authentification
- En tant que visiteur, je peux créer un compte
- En tant qu’utilisateur, je dois valider mon email
- En tant que système, je bloque les bots via CAPTCHA

### Programme
- En tant que visiteur, je consulte les thématiques
- En tant qu’utilisateur, je lis les propositions détaillées

### Commentaires
- En tant qu’adhérent, je commente une proposition
- En tant que modérateur, je valide/refuse un commentaire

### Contributions
- En tant qu’adhérent, je propose une idée
- En tant que modérateur, je valide/refuse

---

## 5. Critères d’acceptation (exemples)

### Inscription
- Email valide requis
- Mot de passe sécurisé
- CAPTCHA fonctionnel
- Email de confirmation envoyé

### Commentaires
- Visible uniquement après validation
- Possibilité de signalement

### Contributions
- Formulaire structuré
- Statut visible (en attente, validé, refusé)

---

## 6. Architecture fonctionnelle

- Frontend : responsive (mobile-first)
- Backend : API sécurisée
- Base de données : utilisateurs + contenus + modération
- Email service : validation compte

---

## 7. Sécurité

- Hash des mots de passe
- Protection XSS / CSRF
- Modération obligatoire
- RGPD conforme

---

## 8. UX/UI

- Interface simple et moderne
- Navigation par thématique
- Mobile prioritaire
- Accessibilité (AA)

---

## 9. Roadmap indicative

### Phase 1 (MVP)
- Inscription
- Consultation
- Commentaires

### Phase 2
- Contributions avancées
- Profils enrichis

### Phase 3
- Animation communauté
- Analytics

---

## 10. KPI de succès

- Nombre d’inscriptions
- Taux d’engagement
- Nombre de contributions
- Temps passé sur site

---

