import { withAuth } from "@/utils/withAuth";
import { notifications, User } from "@/db/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { Notification } from "@/db/schema";

export type NotificationResponse = Notification[];

export const GET = withAuth(async (request: Request, user: User) => {
  const userNotifications = await db.query.notifications.findMany({
    where: eq(notifications.userId, user.id),
    orderBy: [desc(notifications.createdAt)],
    limit: 20,
  });

  return Response.json(userNotifications);
});
