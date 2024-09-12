import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes} from "../routes/userRoutes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { JwtFastify } from "../utils/jwt/jwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify()
app.register(fastifyCookie)

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
export const fastifyJWT = new JwtFastify(app)

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