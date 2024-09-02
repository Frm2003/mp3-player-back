import { FastifyInstance, FastifyReply } from 'fastify';

import { UserController } from '../../controllers/UserController';
import { schemas } from '../middlewares/schemes';

const userController = new UserController();

export const routes = async (fastify: FastifyInstance): Promise<void> => {
    for (const key in schemas) {
        fastify.addSchema(schemas[key]);
    }

    fastify.get(
        '/teste',
        async (_, res: FastifyReply): Promise<FastifyReply> => {
            return res.status(200).send({ mensagem: 'teste OK', status: 200 });
        }
    );

    fastify.post(
        '/user',
        userController.insertValidation(),
        userController.insertUser
    );
};
