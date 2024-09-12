
import { FastifyInstance } from "fastify";
import { IUser } from "../../schema/schemaValidateUser";

import { IJwt } from "./IJwt";


export class JwtFastify implements IJwt{

    constructor(public app: FastifyInstance,) {

    }

    createJwt(user:Omit<IUser, 'password'>) {
        if (!user) throw new Error('credentials invalid')
        const token = this.app.jwt.sign(user)
        return token

    }
    validateJwt(tokenJwt:string) {
      try {
        if(!tokenJwt) throw new Error('Token not found')
        return    this.app.jwt.verify(tokenJwt)
      }
      catch(error) {
        console.error(error)
        throw new Error('unauthorized')
      }
        
    }
}
