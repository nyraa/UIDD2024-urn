// import * as prisma from '@prisma/client';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res)
{
    const { data } = req.body;
    const id = data.id;
    const morgue = await prisma.morgue.upsert({
        where: { id },
        update: data,
        create: data
    });
    res.json(morgue);
}