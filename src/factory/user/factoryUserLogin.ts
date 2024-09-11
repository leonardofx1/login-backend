import { UserRepository } from "../../repository/userRepository"
import { ILoginUserCase } from "../../useCases/user/login/ILoginUserCase"
import { UserLoginCase } from "../../useCases/user/login/useUserLoginCase"


export const makeLoginUser = ():ILoginUserCase => {
    const memoryDb = new UserRepository()
    const makeUserLogin= new UserLoginCase(memoryDb)
    
    return  makeUserLogin
}