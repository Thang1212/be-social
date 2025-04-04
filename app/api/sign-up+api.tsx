import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { profiles, users } from '@/db/schema';
import { hashPassword, generateJWT } from '@/utils/auth';
import { generateUsername } from 'unique-username-generator';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 1. validate email and password
  if (!email || !password)
    return Response.json(
      { error: 'Email and password are required!!' },
      { status: 404 }
    );

  if (password.length < 8)
    return Response.json(
      { error: 'Password must be at least 8 characters long!!' },
      { status: 404 }
    );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: 'Invalid email address!!' }, { status: 404 });
  }

  // 2. look up user by email in db
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  // 3. if user exists, return error
  if (user) {
    return Response.json({ error: 'User already exists!!' }, { status: 404 });
  }

  const hashedPassword = await hashPassword(password);

  // 4. create user in db
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning();

  // 4a. create user profile
  const displayName = generateUsername(" ");
  await db.insert(profiles).values({
    userId: newUser.id,
    displayName,
  })

  // 5. create jwt token
  const token = await generateJWT(newUser.id);

  // 6. return token
  return Response.json({ token });

  // return Response.json({ message: "Hello, world!!"});
}
