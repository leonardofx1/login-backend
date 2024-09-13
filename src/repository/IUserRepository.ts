
import { IUser } from "../schema/schemaValidateUser";
export type IUserDb = Promise<Omit<IUser, 'password'>& {id:string}| undefined>
export  interface IUserRepository  {
    save :(user:IUser) => Promise<IUser & {id:string}>;
    login: (user:Omit<IUser, 'name'>) => IUserDb 
    findByEmailUser :(email:string) => Promise<IUser & {id:string} | undefined>
}