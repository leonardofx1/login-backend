import { IUser } from "../../../schema/schemaValidateUser";
export interface IRegisterUserCase {
    createUser:(body:IUser) => void;
   
}
