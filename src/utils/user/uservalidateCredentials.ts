
import { ZodError } from "zod"
import { IUser, schemaValidateUser } from "../../schema/schemaValidateUser"

export interface IValidateSchema {
    validate(user:IUser) : IUser | ZodError
}

export class ZodValidate implements IValidateSchema   {
    constructor() {}
    validate (user:IUser): IUser | ZodError {
       return  schemaValidateUser.parse(user)
    }
}