import { FastifyInstance } from 'fastify';

import { UserController } from '../../controllers/UserController';
import { schemas } from '../middlewares/schemes';

const userController = new UserController();

export const routes = async (fastify: FastifyInstance): Promise<void> => {
    for (const key in schemas) {
        fastify.addSchema(schemas[key]);
    }

    fastify.post(
        '/user',
        userController.insertValidation(),
        userController.insertUser
    );
};
