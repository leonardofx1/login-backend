import { IUser } from "../../../schema/schemaValidateUser";

export type Userlogin = Promise< Omit<IUser, 'password'> & {id:string} | undefined>

export interface ILoginUserCase {
    login :(user:IUser) => Promise<Omit<IUser, "password"> | undefined>
    validatePassword: (password:string, passwordHash:string) => Promise<boolean>
}
