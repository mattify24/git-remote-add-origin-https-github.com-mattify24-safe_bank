import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new profile
  const newProfile = await prisma.profile.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });
  console.log('Created Profile:', newProfile);

  // Fetch all profiles
  const allProfiles = await prisma.profile.findMany();
  console.log('All Profiles:', allProfiles);

  // Update a profile (assuming ID 1 exists)
  const updatedProfile = await prisma.profile.update({
    where: { id: 1 },
    data: { name: 'Jane Doe' },
  });
  console.log('Updated Profile:', updatedProfile);

  // Delete a profile (assuming ID 1 exists)
  const deletedProfile = await prisma.profile.delete({
    where: { id: 1 },
  });
  console.log('Deleted Profile:', deletedProfile);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });