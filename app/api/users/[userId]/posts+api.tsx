import { posts, profiles } from "@/db/schema";
import { db } from "@/db";
import { User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { desc, eq } from "drizzle-orm";

export const GET = withAuth(async (request: Request, user: User) => {
  const parts = request.url.split("/");
  const userId = parts[parts.length - 2];

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const userPosts = await db.query.posts.findMany({
    where: eq(posts.userId, userId),
    orderBy: [desc(posts.createdAt)],
    limit: 20,
  });

  return Response.json(userPosts);
});
