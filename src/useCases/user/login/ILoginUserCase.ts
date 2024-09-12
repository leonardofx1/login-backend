import { IUser } from "../../../schema/schemaValidateUser";
export type IUserAutenticate = Promise< Omit<IUser, 'password'> & {token:string,id:string} | undefined>

export interface ILoginUserCase {
    login :(user:IUser) => IUserAutenticate
  
}
