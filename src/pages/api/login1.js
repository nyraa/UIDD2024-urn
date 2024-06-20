// login1.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { accountID, password } = req.body;

    try {
        // 查询用户是否存在
        const user = await prisma.user.findUnique({
            where: {
                email: accountID // 假设您的账户 ID 是用户的邮箱
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true // 返回密码用于验证，可根据需要选择性返回
            }
        });

        // 检查用户是否存在且密码匹配
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 验证成功，返回上一页
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    } finally {
        await prisma.$disconnect(); // 断开 Prisma Client 连接
    }
}
