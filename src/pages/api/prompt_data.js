import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const data = req.body;
            // console.log('Received POST data:', data); // 日誌輸出接收到的數據

            const result = await prisma.prompt.create({
                data: {
                    promptId: data.promptId,
                    death_story: data.death_story,
                    person_features: data.person_features,
                    memorial_activity: data.memorial_activity,
                    alive_family: data.alive_family,
                    dead_family: data.dead_family,
                    elementary_school: data.elementary_school,
                    middle_school: data.middle_school,
                    high_school: data.high_school,
                    college: data.college,
                    graduate: data.graduate,
                    career: data.career,
                    hobby: data.hobby,
                    volunteer: data.volunteer,
                    religion: data.religion
                }
            });

            console.log('Prompt created:', result);
            res.status(200).json({ id: result.id });
        } else if (req.method === 'PUT') {
            const data = req.body;
            console.log('Received PUT data:', data); // 日誌輸出接收到的數據

            if (!data.id) {
                return res.status(400).json({ error: 'ID is required for updating' });
            }

            const result = await prisma.prompt.update({
                where: {
                    id: data.id, // 確保 id 是存在的並且是有效的
                },
                data: {
                    death_story: data.death_story,
                    person_features: data.person_features,
                    memorial_activity: data.memorial_activity,
                    alive_family: data.alive_family,
                    dead_family: data.dead_family,
                    elementary_school: data.elementary_school,
                    middle_school: data.middle_school,
                    high_school: data.high_school,
                    college: data.college,
                    graduate: data.graduate,
                    career: data.career,
                    hobby: data.hobby,
                    volunteer: data.volunteer,
                    religion: data.religion
                }
            });

            console.log('Prompt updated:', result);
            res.status(200).json({ id: result.id });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}