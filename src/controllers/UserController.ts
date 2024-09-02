import { FastifyRequest, FastifyReply } from 'fastify';

import { insert } from '../services/UserService';

interface User {
    nome: string;
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
        const { nome, senha } = req.body;

        try {
            return res.status(201).send(await insert(nome, senha));
        } catch (error) {
            return res
                .status(500)
                .send({ error: 'Erro ao criar o usuário', details: error });
        }
    }
}
