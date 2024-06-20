import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const data = req.body;
        // console.log('Received POST data:', data);
        
        const galleryData = data.gallery || [];
        // console.log('Processed gallery data:', galleryData); // 確認gallery 是數組 

        if (req.method === 'POST') {
          console.log('Processing POST request...');
          const result = await prisma.morgue.create({
              data: {
                  ownerId: data.ownerId,
                  golden_quote: data.golden_quote,
                  cover_src: data.cover_src,
                  urn_index: data.urn_index,
                  urn_texture_src: data.urn_texture_src,
                  name: data.name,
                  title: data.title,
                  born_date: data.born_date,
                  born_calendar: data.born_calendar,
                  death_date: data.death_date,
                  death_calendar: data.death_calendar,
                  last_live_city: data.last_live_city,
                  life_story: data.life_story,
                  gallery: {
                      create: []
                  }
              },
              include: {
                gallery: true // 確保返回 gallery 關聯數據
              }
          });
          console.log('POST request processed successfully:', result);
          res.status(200).json({ id: result.id });
      } else if (req.method === 'PUT') {
          console.log('Processing PUT request...');
          const result = await prisma.morgue.update({
              where: { id: data.id },
              data: {
                  ownerId: data.ownerId,
                  golden_quote: data.golden_quote,
                  cover_src: data.cover_src,
                  urn_index: data.urn_index,
                  urn_texture_src: data.urn_texture_src,
                  name: data.name,
                  title: data.title,
                  born_date: data.born_date,
                  born_calendar: data.born_calendar,
                  death_date: data.death_date,
                  death_calendar: data.death_calendar,
                  last_live_city: data.last_live_city,
                  life_story: data.life_story,
                  gallery: {
                      deleteMany: {}, // 先刪除舊的圖片
                      create: galleryData.map(gallery => ({
                        id: gallery.id,
                          image: gallery.image
                      }))
                  }
              },
              include: {
                  gallery: true // 確保返回 gallery 關聯數據
              }
          });
          console.log('PUT request processed successfully:', result);
          res.status(200).json({ id: result.id });
      } else {
          res.status(405).json({ error: 'Method not allowed' });
      }
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}