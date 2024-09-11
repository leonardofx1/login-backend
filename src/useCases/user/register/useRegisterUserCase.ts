
import { UserAlreadyExistsError } from "../../../erros/user/userAlreadyExists.error";
import { IUserRepository } from "../../../repository/IUserRepository";
import { IUser} from "../../../schema/schemaValidateUser";
import { encryptPassword, validateUser } from "../../../utils/user/userUtls";
import { IRegisterUserCase } from "./IRegisterUserCase";

export class UseRegisterUserCase implements IRegisterUserCase  {
    constructor(private memoryDb:IUserRepository) {

    }
    async createUser (user:IUser) {
  
        const _user = validateUser(user)
        
        const passwordHash =  await encryptPassword(_user.password)
        const userEmail = await this.memoryDb.findByEmailUser(_user.email)

        if(userEmail) throw new UserAlreadyExistsError()
      
        _user.password = passwordHash
        this.memoryDb.save(_user)

    }
  
}

