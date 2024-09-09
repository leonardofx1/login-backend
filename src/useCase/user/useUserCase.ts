
import { IUserRepository } from "../../repository/IUserRepository";
import { IUser, validateUser } from "../../schema/schemaValidateUser";
import bcrypt from 'bcryptjs'
import { findByUser } from "../../utils/findByUser";

import { IUserCase } from "./IUserCase";

export class UseUserCase implements IUserCase  {
    constructor(private memoryDb:IUserRepository) {

    }
    async createUser (user:IUser) {
        const _user = this.validateUser(user)
        const passwordHash = this.encryptPassword(_user.password)
        await this.duplicateUserCheck(_user.email)
      
        _user.password = passwordHash
        this.memoryDb.save(_user)

    }
    encryptPassword (password:string) {
        const salt = bcrypt.genSaltSync(6)
        const password_hash = bcrypt.hashSync( password, salt)
        console.log(password_hash)
        return password_hash
    }
    async  duplicateUserCheck(email:string) {
        const _user = await findByUser(email)
        
        if(!!_user) throw new Error('Usuário já existe.')
}
validateUser(user:IUser){
    return validateUser.parse(user)
}
}

