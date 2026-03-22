import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'hachem_alaoui@yahoo.fr' }
  });
  
  if (user) {
    console.log('✅ Utilisateur créé:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Vérifié: ${user.verified}`);
  } else {
    console.log('❌ Utilisateur NON créé');
  }
}

main().finally(() => prisma.$disconnect());
