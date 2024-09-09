import { FastifyReply, FastifyRequest } from "fastify"
import { IUser} from "../../schema/schemaValidateUser"

import { IUserRepository } from "../../repository/IUserRepository"
import { IUserCase } from "../../useCase/user/IUserCase" 
export class UserController {
    userCase:IUserCase
    constructor(private UserRepository:IUserRepository,private UseUserCase){
        this.userCase = this.UseUserCase(this.UserRepository) 
    }
    
 async registerUser (req:FastifyRequest, reply:FastifyReply){
  
    try {
        const body= req.body as IUser
        await this.userCase.createUser(body)
        reply.status(201).send({message:'Usuário criado com sucesso'})
    } catch (error) {
        console.error(error)
         reply.status(409).send({message: 'Usuário já existe no banco de dados.'})

    }

}
}