import { paths } from "@/infra/config/path.js";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export class LogoutRoute {
    constructor(private readonly fastify: FastifyInstance) {}
    execute() {
        this.fastify.withTypeProvider<ZodTypeProvider>().route({
            method: "GET",
            url: paths.logout,
            handler: async (_request, reply) => {
                reply.clearCookie('token', {path: '/'})
            }
        })

    }
}