import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import { hashPassword, generateJWT } from '@/utils/auth';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // 2. look up user by email in db 
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    // 3. if user not exist, return error
    if (!user) {
        return Response.json({ error: 'User does not exist!!' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password);

    if (user.password !== hashedPassword) {
        return Response.json({ error: 'Invalid password!!' }, { status: 400 })
    }

    // 5. create jwt token
    const token = await generateJWT(user.id);

    // 6. return token
    return Response.json({ token });
}