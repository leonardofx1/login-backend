import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes} from "../routes/userRoutes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { JwtFastify } from "../utils/jwt/createJwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify()
app.register(fastifyCookie)
app.addHook('preHandler', async (req:FastifyRequest, reply:FastifyReply) => {
  const route = req.routerPath === '/register'

  if(route) return
  const jwtFastify = new JwtFastify(app)
  const user = {name:'leonardo',email:'leo2gmail.com'}
  try {
    const token  = jwtFastify.createJwt(user)
    reply.setCookie('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'strict',
    }).send({success:true})
  }catch(error) {
    
    reply.status(401).send({error:'unauthorized'})

    
  }
})
app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        message: 'Erro de validação',
        errors: error.format(),
      });
    } else {
      reply.status(500).send({
        message: 'Erro interno do servidor',
      });
    }
  });
app.register(userRoutes)
app.register(fastifyJwt, {
  secret:'meu-segredo',
  
})

const start = async () => {
    try {
        await app.listen({
            port:3033,
        })
      
    }catch(error) {
        console.error(error)
        process.exit(1)
    }
   
}

start()