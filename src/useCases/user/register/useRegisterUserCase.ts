
import { UserAlreadyExistsError } from "../../../erros/user/userAlreadyExists.error";
import { IUserRepository } from "../../../repository/IUserRepository";
import { IUser} from "../../../schema/schemaValidateUser";
import { IEncrypt } from "../../../utils/encryptJs/encrypt";
import { IValidateSchema } from "../../../utils/user/uservalidateCredentials";

import { IRegisterUserCase } from "./IRegisterUserCase";

export class UseRegisterUserCase implements IRegisterUserCase  {
    constructor(private memoryDb:IUserRepository, private encryptCredentials:IEncrypt,private validateCredentials:IValidateSchema) {

    }
    async createUser (user:IUser) {
  
        const _user = this.validateCredentials.validate(user) as IUser
        const passwordHash = await  this.encryptCredentials.encryptPassword(_user.password)
        const userEmail = await this.memoryDb.findByEmailUser(_user.email)

        if(userEmail) throw new UserAlreadyExistsError()
      
        _user.password = passwordHash
        this.memoryDb.save(_user)

    }
  
}

