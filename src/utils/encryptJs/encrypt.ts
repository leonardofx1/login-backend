import bcrypt from 'bcryptjs'
import { CredentialsError } from '../../erros/credentialsError/credentials.error'

export interface IEncrypt {
  encryptPassword: (password:string) => Promise<string>;
  validatePassword: (password:string, passwordHash:string) =>  Promise<boolean>
} 

export class EncriptionUtils implements  IEncrypt {
    constructor(private salt:number = 6){}
    
    
   async encryptPassword (password:string)  {
      try {
        const salt = await bcrypt.genSalt(this.salt)
        const passwordHash =await  bcrypt.hash( password, salt)
        return passwordHash
      } catch (error) {
        throw new CredentialsError()
      }
     
    }

   async  validatePassword (password:string,passwordHash:string) {
      try {
        const isPasswordValid = await  bcrypt.compare(password,passwordHash)
        return isPasswordValid
      } catch (error) {
        throw new CredentialsError()
      }
    }

    
}