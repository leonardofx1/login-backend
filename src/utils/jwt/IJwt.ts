import { IUser } from "../../schema/schemaValidateUser";

export interface IJwt {
   validateJwt: (token:string) => string | object;
    createJwt: (user: Omit<IUser, 'password'>) => string
}