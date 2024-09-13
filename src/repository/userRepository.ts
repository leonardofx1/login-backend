import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { user } from "../db/schema";
import { IUser } from "../schema/schemaValidateUser";
import { IUserDb, IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {

    async save(userCreate: IUser) {
        const [userDb] = await db.insert(user).values(userCreate).returning({ name: user.name, email: user.email, password: user.password, id: user.id })
    
        return userDb

    }
     findByEmailUser = async  (email:string) => {
        return  db.query.user.findFirst({where: eq(user.email, email)})
     }
     

    async login({ email, password }: Omit<IUser, 'name'>):IUserDb {
        const userDb = await db.query.user.findFirst({
            where: and(eq(user.email, email), eq(user.password, password)),
            columns: {
                password: false
            }
        })

        if(!!userDb) {
            return userDb
        }
        return undefined
    }
}