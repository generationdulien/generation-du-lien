import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.topic.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample topics
  const topics = await Promise.all([
    prisma.topic.create({
      data: {
        title: "Éducation",
        slug: "education",
        summary:
          "Notre vision pour une éducation inclusive et de qualité pour tous",
        content: `
# Éducation - Notre programme

## Constats
- Inégalités d'accès à l'éducation de qualité
- Manque de moyens pour les établissements
- Disparités territoriales

## Priorités
- Augmenter les investissements éducatifs
- Réduire les inégalités scolaires
- Moderniser les apprentissages

## Mesures
1. Augmenter de 20% le budget éducation
2. Recruter 10 000 enseignants
3. Mettre à jour les curricula
        `,
        image: null,
        published: true,
        order: 1,
      },
    }),
    prisma.topic.create({
      data: {
        title: "Santé",
        slug: "sante",
        summary: "Accès à une santé de qualité pour tous les citoyens",
        content: `
# Santé - Notre programme

## Constats
- Déserts médicaux croissants
- Urgences saturées
- Coût des soins élevé

## Priorités
- Renforcer l'offre médicale en zones rurales
- Améliorer l'accès aux soins d'urgence
- Réduire les restes à charge

## Mesures
1. Créer 500 nouveaux postes médicaux
2. Renforcer les hôpitaux
3. Élargir la couverture sociale
        `,
        image: null,
        published: true,
        order: 2,
      },
    }),
    prisma.topic.create({
      data: {
        title: "Écologie",
        slug: "ecologie",
        summary: "Transition écologique pour la planète et les générations futures",
        content: `
# Écologie - Notre programme

## Constats
- Réchauffement climatique en accélération
- Biodiversité menacée
- Pollution persistante

## Priorités
- Décarboner l'économie
- Protéger les écosystèmes
- Adapter le territoire au changement climatique

## Mesures
1. Atteindre la neutralité carbone en 2050
2. Développer les énergies renouvelables
3. Protéger 30% des espaces naturels
        `,
        image: null,
        published: true,
        order: 3,
      },
    }),
    prisma.topic.create({
      data: {
        title: "Démocratie",
        slug: "democratie",
        summary: "Renforcer la démocratie et la participation citoyenne",
        content: `
# Démocratie - Notre programme

## Constats
- Défiance envers les institutions
- Participation électorale en baisse
- Démocratie locale affaiblie

## Priorités
- Restaurer la confiance publique
- Élargir la participation citoyenne
- Renforcer les pouvoirs locaux

## Mesures
1. Mettre en place des consultations citoyennes
2. Développer la démocratie participative
3. Dépasser le système électoral actuel
        `,
        image: null,
        published: true,
        order: 4,
      },
    }),
    prisma.topic.create({
      data: {
        title: "Culture",
        slug: "culture",
        summary: "Promouvoir la culture, l'art et la création",
        content: `
# Culture - Notre programme

## Constats
- Accès à la culture inégal
- Secteur créatif fragilisé
- Patrimoine insuffisamment protégé

## Priorités
- Démocratiser l'accès à la culture
- Soutenir les créateurs
- Protéger le patrimoine

## Mesures
1. Augmenter le budget culture de 30%
2. Créer des espaces culturels de proximité
3. Soutenir les artistes indépendants
        `,
        image: null,
        published: true,
        order: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${topics.length} topics`);

  // Create sample users (for testing)
  const hashedPassword = await bcrypt.hash("TestPassword123!", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "test@example.com",
        passwordHash: hashedPassword,
        firstName: "Test",
        lastName: "User",
        verified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "unverified@example.com",
        passwordHash: hashedPassword,
        firstName: "Unverified",
        lastName: "User",
        verified: false,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} test users`);
  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
