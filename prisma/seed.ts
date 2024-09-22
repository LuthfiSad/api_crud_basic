import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Fungsi untuk melakukan seeding
async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: any[] = [];
  
  // Membuat hash password untuk semua user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Generate 50 data user dummy
  for (let i = 1; i <= 50; i++) {
    users.push({
      name: `User${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      role: i % 2 === 0 ? 'admin' : 'anggota',  // Role bergantian antara admin dan anggota
      image: `https://randomuser.me/api/portraits/men/${i}.jpg`
    });
  }

  // Insert users ke dalam database
  await prisma.user.createMany({
    data: users,
  });

  console.log('50 Users created successfully!');
}

// Jalankan seeder
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
