
import { UserAlreadyExistsError } from "../../../erros/user/userAlreadyExists.error";
import { IUserAutenticate, IUserRepository } from "../../../repository/IUserRepository";
import { IUser} from "../../../schema/schemaValidateUser";

import { IEncrypt } from "../../../utils/encryptJs/encrypt";

import { ILoginUserCase } from "./ILoginUserCase";
import { IValidateSchema } from "../../../utils/user/uservalidateCredentials";

export class UserLoginCase implements ILoginUserCase {
    constructor(private memoryDb: IUserRepository, private validateCredentials: IEncrypt, private validateSchemaUser: IValidateSchema, private jwt) { }

    async login(credentials: IUser): Promise<IUserAutenticate> {

        const user = this.validateSchemaUser.validate(credentials) as IUser
        const userDb = await this.memoryDb.findByEmailUser(user.email)
        if (!userDb) throw new UserAlreadyExistsError()

        const isMatch = await this.validateCredentials.validatePassword(credentials.password, userDb.password)

        if (isMatch) {
            const { name, email, id } = userDb
            const token = this.jwt.createJwt({ name, email }

            )
            return { name, email, id, token }
        }
    }

}
