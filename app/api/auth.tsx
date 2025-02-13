import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET : string = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET : string = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        const { username, password } = req.body;

        if (username === 'user' && password === 'password') {
            const tokens = generateTokens('user123');
            res.setHeader('Set-Cookie', `refreshToken=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=604800`);
            return res.status(200).json({ accessToken: tokens.accessToken });
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (method === 'GET') {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as string) as {userId:string};
            const tokens = generateTokens(decoded.userId);
            res.setHeader('Set-Cookie', `refreshToken=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=604800`);
            return res.status(200).json({ accessToken: tokens.accessToken });
        } catch {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
