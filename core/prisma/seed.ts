import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordAdminHash = await hash(process.env.ADMIN_PASSWORD, 10);

    await prisma.admin.upsert({
        where: {
            email: process.env.ADMIN_EMAIL,
        },
        update: {
            email: process.env.ADMIN_EMAIL,
            password: passwordAdminHash,
        },
        create: {
            email: process.env.ADMIN_EMAIL,
            password: passwordAdminHash.toString(),
        },
    });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
