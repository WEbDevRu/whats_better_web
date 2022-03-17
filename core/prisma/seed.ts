import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordAdminHash = await hash(process.env.ADMIN_PASSWORD, 10);
    await prisma.admin.upsert({
        where: {
            email: 'nikrainev@gmail.com',
        },
        update: {
            email: 'nikrainev@gmail.com',
            password: passwordAdminHash,
        },
        create: {
            organizer_id: '0x5',
            email: 'nikrainev@gmail.com',
            password: passwordAdminHash,
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
