const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function main() {
    const adminRole = await db.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'admin',
            label: 'ADMIN',
        },
    });
    const memberRole = await db.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'member',
            label: 'MEMBER',
        },
    });
    const staffRole = await db.role.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'staff',
            label: 'STAFF',
        },
    });

    const admin = await db.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@admin.com',
            first_name: 'Admin',
            last_name: 'Adm',
            phone_number: '+6281234567890',
            password: bcrypt.hashSync(process.env.ADMIN_PASS, 12),
            active: true,
            role_id: adminRole.id,
            profiles: {
                create: {
                    bio: 'Admin System',
                },
            },
        },
    });

    console.log({
        adminRole, memberRole, staffRole, admin,
    });
}
main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
