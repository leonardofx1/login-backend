import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { user } from "../db/schema";
import { IUser } from "../schema/schemaValidateUser";
import { IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {

    async save(userCreate: IUser) {
        const [userDb] = await db.insert(user).values(userCreate).returning({ name: user.name, email: user.email, password: user.password, id: user.id })
        console.log('db returning ', userDb)
        return userDb

    }


    async login({ email, password }: Omit<IUser, 'name'>) {
        const userDb = await db.query.user.findFirst({
            where: and(eq(user.email, email), eq(user.password, password)),
            columns: {
                password: false
            }
        })

        return userDb as Omit<IUser, 'password'> & { id: string } | null
    }
}