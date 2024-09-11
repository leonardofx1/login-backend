
import bcrypt from 'bcryptjs'
import { IUser, schemaValidateUser } from "../../schema/schemaValidateUser"


export const  encryptPassword = async (password:string) =>  {
    const salt = bcrypt.genSaltSync(6)
    const password_hash = bcrypt.hashSync( password, salt)
    console.log(password_hash)
    return password_hash
}



export const validateUser = (user:IUser) => {
    
    return schemaValidateUser.parse(user)
}