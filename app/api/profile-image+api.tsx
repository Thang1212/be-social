import { profiles } from "@/db/schema";
import { db } from "@/db";
import { User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const PUT = withAuth(async (request: Request, user: User) => {
  const { imageId } = await request.json();

  if (!imageId) {
    return Response.json({ error: "Image ID is required" }, { status: 400 });
  }

  const profile = await db
    .update(profiles)
    .set({ imageId })
    .where(eq(profiles.userId, user.id));

  return Response.json(profile);
});
