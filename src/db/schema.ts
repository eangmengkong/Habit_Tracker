import {
  serial,
  text,
  boolean,
  integer,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  completedToday: boolean("completed_today").notNull().default(false),
  streak: integer("streak").notNull().default(0),
  lastCompleted: timestamp("last_completed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
