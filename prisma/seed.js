const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const addresses = await prisma.address.create({
      data: {address: "0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740"}
    });
  }
  
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })