import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  Follower,
  followers,
  notifications,
  profiles,
  User,
} from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { and } from "drizzle-orm";

export type FollowUserResponse = Follower;

export const GET = withAuth(async (request: Request, user: User) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const following = await db.query.followers.findFirst({
    where: and(
      eq(followers.userId, user.id),
      eq(followers.followingId, userId)
    ),
  });

  return Response.json(!!following, { status: 200 });
});

export const POST = withAuth(async (request: Request, user: User) => {
  const { toFollowUserId, unfollow } = await request.json();

  if (!toFollowUserId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (!profile) {
    return Response.json({ error: "Profile not found" }, { status: 400 });
  }

  if (unfollow) {
    await db
      .delete(followers)
      .where(
        and(
          eq(followers.userId, user.id),
          eq(followers.followingId, toFollowUserId)
        )
      )
      .returning();
    return Response.json({ following: undefined }, { status: 200 });
  } else {
    const following = await db.query.followers.findFirst({
      where: and(
        eq(followers.userId, user.id),
        eq(followers.followingId, toFollowUserId)
      ),
    });

    if (following) {
      return Response.json({ error: "Already following" }, { status: 400 });
    }

    const follower = await db.insert(followers).values({
      userId: user.id,
      followingId: toFollowUserId,
    });

    await db.insert(notifications).values({
      userId: toFollowUserId,
      fromUserId: user.id,
      type: "follow",
      content: `${profile.displayName} followed you`,
    });

    return Response.json({ follower }, { status: 200 });
  }
});
