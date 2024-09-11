import { UserRepository } from "../../repository/userRepository"
import { IRegisterUserCase } from "../../useCases/user/register/IRegisterUserCase"
import { UseRegisterUserCase } from "../../useCases/user/register/useRegisterUserCase"


export const makeRegisterUser = ():IRegisterUserCase => {
    const userRepository = new UserRepository()
    const makeRegisterUserCase = new  UseRegisterUserCase(userRepository)
    return  makeRegisterUserCase
}
