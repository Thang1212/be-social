import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
        userIdIdx: index("user_id_idx").on(t.userId),
    }) 
);

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    text: varchar("text", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
        userIdIdx: index("posts_user_id_idx").on(t.userId),
    }) 
);

export const userRelations = relations(users, ({ one }) => ({
    profile: one(profiles, {
        fields: [users.id],
        references: [profiles.userId],
    }), 
    // posts: many(posts, {
    //     fields: [users.id],
    //     references: [posts.userId],
    // }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, {
        fields: [profiles.userId],
        references: [users.id],
    })
})) ;

export const postsRelations = relations(posts, ({ one }) => ({
    profile: one(profiles, {
        fields:  [posts.userId],
        references: [profiles.userId],
    })
}))

export type Post = typeof posts.$inferSelect;

