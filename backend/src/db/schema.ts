import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
}
export const department = pgTable("departments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    ...timestamps
});
export const subjects = pgTable("subjects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    departmentId: integer('department_id').notNull().references(() => department.id, { onDelete: 'restrict' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    ...timestamps
});

export const departmentsRelations = relations(department, ({ many }) => ({
    subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
    department: one(department, {
        fields: [subjects.departmentId],
        references: [department.id],
    }),
    classes: many(classes),
}));
export type Department = typeof department.$inferSelect;
export type NewDepartment = typeof department.$inferInsert;

export type Subject = typeof department.$inferSelect;
export type NewSubject = typeof department.$inferInsert;