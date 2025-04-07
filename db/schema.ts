import { relations } from "drizzle-orm";
import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    imageId: uuid("image_id"),
  },
  (t) => ({
    userIdIdx: index("user_id_idx").on(t.userId),
  })
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    text: varchar("text", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    userIdIdx: index("posts_user_id_idx").on(t.userId),
  })
);

export const followers = pgTable(
  "followers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    followingId: uuid("following_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    userIdIdx: index("followers_user_id_idx").on(t.userId),
    followingIdIdx: index("followers_following_id_idx").on(t.followingId),
  })
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    fromUserId: uuid("from_user_id").notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    content: varchar("content", { length: 255 }),
  },
  (t) => ({
    userIdIdx: index("notifications_user_id_idx").on(t.userId),
    fromUserIdIdx: index("notifications_from_user_id_idx").on(t.fromUserId),
  })
);

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profileRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const postRelations = relations(posts, ({ one }) => ({
  profile: one(profiles, {
    fields: [posts.userId],
    references: [profiles.userId],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type User = typeof users.$inferSelect;
export type Follower = typeof followers.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
