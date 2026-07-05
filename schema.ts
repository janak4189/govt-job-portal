import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  qualification: varchar("qualification", { length: 255 }),
  salary: varchar("salary", { length: 255 }),
  postedDate: timestamp("posted_date").defaultNow().notNull(),
  lastDate: timestamp("last_date").notNull(),
  applicationUrl: varchar("application_url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
