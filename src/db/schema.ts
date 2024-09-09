import {integer, pgTable, text, uuid }from 'drizzle-orm/pg-core'


export const user = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    email:text('email').notNull().unique()

})