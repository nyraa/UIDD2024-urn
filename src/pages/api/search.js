import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;
    
    try {
      let urns;
      if (query) {
        urns = await prisma.morgue.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                },
              },
              {
                last_live_city: {
                  contains: query,
                },
              },
            ],
          },
          select: {
            cover_src: true,
            urn_texture_src: true,
            name: true,
            last_live_city: true,
          },
          orderBy: {
            name: 'asc',
          },
        });
      } else {
        urns = await prisma.morgue.findMany({
          select: {
            cover_src: true,
            urn_texture_src: true,
            name: true,
            last_live_city: true,
          },
          orderBy: {
            name: 'asc',
          },
          take: 10, // 例如，只取前10条热门数据
        });
      }

      res.status(200).json(urns);
    } catch (error) {
      console.error('Error fetching URN data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
