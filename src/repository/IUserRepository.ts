
import { IUser } from "../schema/schemaValidateUser";
export type IUserAutenticate = Omit<IUser, 'password'> & {token:string,id:string} | undefined
export  interface IUserRepository  {
    save :(user:IUser) => Promise<IUser & {id:string}>;
    login: (user:Omit<IUser, 'name'>) => Promise<IUserAutenticate>
    findByEmailUser :(email:string) => Promise<IUser & {id:string} | undefined>
}