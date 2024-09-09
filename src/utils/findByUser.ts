import { eq } from "drizzle-orm"
import { db } from "../db"
import { user } from "../db/schema"



export const findByUser = async  (email:string) => {
   return  db.query.user.findFirst({where: eq(user.email, email)})
}