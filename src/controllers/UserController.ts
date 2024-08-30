import { FastifyRequest, FastifyReply } from 'fastify';

import { insert } from '../services/UserService';

interface User {
    nick: string;
    senha: string;
}

export class UserController {
    public insertValidation() {
        return { schema: { body: { $ref: 'userSchema#' } } };
    }

    public async insertUser(
        req: FastifyRequest<{ Body: User }>,
        res: FastifyReply
    ): Promise<FastifyReply<any>> {
        const { nick, senha } = req.body;

        try {
            const newUser = await insert(nick, senha);
            return res.status(201).send(newUser);
        } catch (error) {
            return res
                .status(500)
                .send({ error: 'Erro ao criar o usuário', details: error });
        }
    }
}
