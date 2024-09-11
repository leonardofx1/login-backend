import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../schema/schemaValidateUser";
import { IRegisterUserCase } from "../../useCases/user/register/IRegisterUserCase";
import { ILoginUserCase } from "../../useCases/user/login/ILoginUserCase";
import { UserAlreadyExistsError } from "../../erros/user/userAlreadyExists.error";

export class UserController {
    constructor(private userRegisterCase: IRegisterUserCase, private userLoginCase: ILoginUserCase) {}

    registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = req.body as IUser;
            console.log(body, this.userRegisterCase)
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
            reply.status(200).send(user);
        } catch (error) {
            if(true) throw error
            reply.status(401).send({ message: 'Falha no login.' });
        }
    };
}
