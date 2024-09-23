import { FastifyInstance } from "fastify"

import { userController } from "../factory/user/userController"


export const userRoutes = async (app: FastifyInstance) => {

    const controllerUser = userController()
  
    
    app.post('/register',controllerUser.registerUser)
    app.post('/login', controllerUser.loginUser)

    
}
