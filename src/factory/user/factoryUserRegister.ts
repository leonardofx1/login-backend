import { UserRepository } from "../../repository/userRepository"
import { IRegisterUserCase } from "../../useCases/user/register/IRegisterUserCase"
import { UseRegisterUserCase } from "../../useCases/user/register/useRegisterUserCase"
import { EncriptionUtils } from "../../utils/encryptJs/encrypt"
import { ValidateCredentials } from "../../utils/user/uservalidateCredentials"


export const makeRegisterUser = ():IRegisterUserCase => {
    const userRepository = new UserRepository()
    const encrypt = new EncriptionUtils()
    const validateCredentials =new ValidateCredentials()
    const makeRegisterUserCase = new  UseRegisterUserCase(userRepository,encrypt,validateCredentials)
    return  makeRegisterUserCase
}
