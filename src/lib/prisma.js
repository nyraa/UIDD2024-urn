// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let prisma;

const prismaClientSingleton = () =>
{
    return new PrismaClient();
};

if(!global.prisma)
{
    global.prisma = prismaClientSingleton();
}

prisma = global.prisma;

module.exports = prisma;
