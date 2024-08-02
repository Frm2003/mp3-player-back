import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user";

export const routes = async (fastify: FastifyInstance) => {
    fastify.get('/', UserController.insert)
}