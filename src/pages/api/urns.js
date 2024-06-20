// pages/api/urns.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch all URNs
    const urns = await prisma.urn.findMany();
    
    // 設置 HTTP 標頭來禁用緩存
    res.setHeader('Cache-Control', 'no-store');
    
    res.status(200).json(urns);
  } else if (req.method === 'POST') {
    // Handle POST request to create a new URN
    const { link, person, urn } = req.body;
    const newUrn = await prisma.urn.create({
      data: {
        link,
        person,
        urn,
      },
    });
    res.status(201).json(newUrn);
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
