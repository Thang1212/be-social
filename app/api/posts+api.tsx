import jwt from "jsonwebtoken";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import {
  followers,
  notifications,
  Post,
  posts,
  profiles,
  User,
  users,
} from "@/db/schema";
import { withAuth } from "@/utils/withAuth";

export type GetPostResponse = (Post & {
  profile: {
    displayName: string;
    imageId: string;
  };
})[];

export const GET = withAuth(async (request: Request, user: User) => {
  const allPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    limit: 20,
    with: {
      profile: {
        columns: {
          displayName: true,
          imageId: true,
        },
      },
    },
  });

  return Response.json(allPosts);
});

export const POST = withAuth(async (request: Request, user: User) => {
  const { text } = await request.json();

  if (!text) {
    return Response.json(
      { error: "Your post requires some text" },
      { status: 400 }
    );
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (!profile) {
    return Response.json({ error: "Profile not found" }, { status: 400 });
  }

  const [newPost] = await db
    .insert(posts)
    .values({
      text,
      userId: user.id,
    })
    .returning();

  const userFollowers = await db.query.followers.findMany({
    where: eq(followers.followingId, user.id),
  });

  await Promise.all(
    userFollowers.map((follower) =>
      db.insert(notifications).values({
        userId: follower.userId,
        fromUserId: user.id,
        type: "post",
        content: `${profile.displayName} posted: ${text.substring(0, 100)}...`,
      })
    )
  );

  return Response.json(newPost);
});
