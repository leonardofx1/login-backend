
import { IUser } from "../schema/schemaValidateUser";

export  interface IUserRepository  {
    save :(user:IUser) => Promise<IUser & {id:string}>;
    login: (user:Omit<IUser, 'name'>) => Promise<Omit<IUser, 'password'>&{id:string} | null> ;
}