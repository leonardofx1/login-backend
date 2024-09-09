import { IUser } from "../../schema/schemaValidateUser";
export interface IUserCase {
    createUser:(body:IUser) => void;
    encryptPassword: (password:string) => string;
    duplicateUserCheck: (email:string) => void
}