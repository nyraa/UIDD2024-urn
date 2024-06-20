import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === "POST")
    {
        const { ownerId } = req.body;
        const draftMorgue = await prisma.morgue.findFirst({
            where: {
                ownerId,
                is_draft: true
            },
            include: {
                gallery: true,
            }
        });
        if(draftMorgue)
        {
            res.status(200).json(draftMorgue);
        }
        else
        {
            res.status(404).json({ message: "Draft morgue not found" });
        }
    }
    else
    {
        res.status(405).json({ message: "Method not allowed" });
    }
};