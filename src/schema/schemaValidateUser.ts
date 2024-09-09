import {z} from 'zod'



export const validateUser = z.object({
    name:z.string().min(2, {message:'insira um nome valido ex: Marcos'}),
    email:z.string().email({message:'email ínvalido ex: man@gmail.com'}),
    password:z.string().min(5,{message:'mínimo de 5 caracteres'}),
})

export type IUser = z.infer<typeof validateUser>