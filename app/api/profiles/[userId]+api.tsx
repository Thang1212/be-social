import { followers, Profile, profiles } from "@/db/schema";
import { db } from "@/db";
import { User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { count, eq } from "drizzle-orm";

export type ProfileResponse = Profile & {
  followingCount: number;
  followersCount: number;
};

export const GET = withAuth(async (request: Request, user: User) => {
  const userId = request.url.split("/").pop();

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  const followingCount = await db
    .select({ count: count() })
    .from(followers)
    .where(eq(followers.userId, userId));

  const followersCount = await db
    .select({ count: count() })
    .from(followers)
    .where(eq(followers.followingId, userId));

  return Response.json({
    ...profile,
    followingCount: followingCount[0].count,
    followersCount: followersCount[0].count,
  });
});
