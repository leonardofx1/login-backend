import { UserRepository } from "../../repository/userRepository"
import { fastifyJWT } from "../../server/server"
import { ILoginUserCase } from "../../useCases/user/login/ILoginUserCase"
import { UserLoginCase } from "../../useCases/user/login/useUserLoginCase"
import { EncriptionUtils } from "../../utils/encryptJs/encrypt"
import { ValidateCredentials } from "../../utils/user/uservalidateCredentials"


export const makeLoginUser = ():ILoginUserCase => {
    const memoryDb = new UserRepository()
    const validateCredentials = new ValidateCredentials()
    const encrypt = new EncriptionUtils()
    
    const makeUserLogin= new UserLoginCase(memoryDb,encrypt,validateCredentials,fastifyJWT )
    
    return  makeUserLogin
}