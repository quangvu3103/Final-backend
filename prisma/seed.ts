import { PrismaClient } from "@prisma/client";
import { roles } from "./data/roles";

const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: roles
    })
}
main().catch(e => {
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})