import { UserAlreadyExistsError } from "../../../erros/user/userAlreadyExists.error";
import { UserRepository } from "../../../repository/userRepository";
import { IUser, schemaValidateUser } from "../../../schema/schemaValidateUser";

import { ILoginUserCase, Userlogin } from "./ILoginUserCase";
import bcrypt from 'bcryptjs';

export class UserLoginCase implements ILoginUserCase {
    constructor(private memoryDb: UserRepository) { }

    async login(credentials: IUser):Userlogin{
        const validatedUser = schemaValidateUser.parse(credentials);

        
            const user = await this.memoryDb.findByEmailUser(validatedUser.email);
            if (!user) throw new UserAlreadyExistsError()

            const isMatch = await this.validatePassword(credentials.password, user.password)

            if(isMatch) {
                const {name,email,id} = user
                return {name,email,id}
            }
        
    }

    async validatePassword(password: string, passwordHash: string) {

        const isMatch = await bcrypt.compare(password, passwordHash)
        if(!isMatch) throw new Error('password incorrect')
        return isMatch

    }
}
