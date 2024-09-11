import { UserController } from "../../http/controllers/userController"
import { makeLoginUser } from "./factoryUserLogin"
import { makeRegisterUser } from "./factoryUserRegister"


export const userController =  () => {
    const registerUser = makeRegisterUser()
    const loginUser = makeLoginUser()
    const controller = new UserController(registerUser,loginUser)

    return controller
} 