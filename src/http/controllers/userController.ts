import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../schema/schemaValidateUser";
import { IRegisterUserCase } from "../../useCases/user/register/IRegisterUserCase";
import { ILoginUserCase } from "../../useCases/user/login/ILoginUserCase";
import { UserAlreadyExistsError } from "../../erros/user/userAlreadyExists.error";
import { IUserAutenticate } from "../../repository/IUserRepository";

export class UserController {
    constructor(private userRegisterCase: IRegisterUserCase, private userLoginCase: ILoginUserCase) {}

    registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = req.body as IUser;
        
            await this.userRegisterCase.createUser(body);

            reply.status(201).send({ message: 'Usuário criado com sucesso' });
        } catch (error) {
            if(error instanceof UserAlreadyExistsError) {

                reply.status(409).send({ message:'user already exists'});
            }
            throw error
        }
    };

    loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = req.body as IUser;
            const user = await this.userLoginCase.login(body);
            if(user ){
            const {token, name,email,id } = user 
      
            reply.setCookie('token',token,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
              })
            reply.status(200).send({name,email,id});}
        } catch (error) {
            reply.status(400).send({ message: 'check the data and try again.' });
        }
    };
}
