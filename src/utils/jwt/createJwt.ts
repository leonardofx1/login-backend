import { fastifyJwt, VerifyPayloadType } from "@fastify/jwt"; import { FastifyInstance } from "fastify";
import { IUser } from "../../schema/schemaValidateUser";


export class JwtFastify {

    constructor(public app: FastifyInstance,) {

    }

    createJwt(user: Omit<IUser, 'password'>): string {
        if (!user) throw new Error('credentials invalid')
        const token = this.app.jwt.sign(user)
        return token

    }
    validateJwt(tokenJwt: string): VerifyPayloadType {
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
