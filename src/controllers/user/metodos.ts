import { FastifyRequest, FastifyReply } from "fastify";

export const insert = async (req: FastifyRequest, res:FastifyReply): Promise<FastifyReply<any>> => {
    return res.status(200).send("text insert user")
}