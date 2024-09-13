
import { ZodError } from "zod"
import { IUser, schemaValidateUser } from "../../schema/schemaValidateUser"

export interface IValidateSchema {
    validate(user:IUser) : IUser | ZodError
}

export class ValidateCredentials implements IValidateSchema   {
    constructor() {}
    validate (user:IUser): IUser | ZodError {
       return  schemaValidateUser.parse(user)
    }
}