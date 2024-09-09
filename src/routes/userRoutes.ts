import { FastifyInstance } from "fastify"

import {  UserController } from "../http/controller/userController"


export const userRoutes = async (app: FastifyInstance) => {

    const userController = new UserController()
    app.post('/create',userController.registerUser.bind(userController))
    
}