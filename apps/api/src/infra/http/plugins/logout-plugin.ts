import { FastifyInstance } from "fastify";
import { LogoutRoute } from "../routes/logout-route.js";

export default async function logoutPlugin(app: FastifyInstance) {
    new LogoutRoute(app).execute()
}