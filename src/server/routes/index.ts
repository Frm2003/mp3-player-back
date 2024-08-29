import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/UserController';

const userController = new UserController();

export const routes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.post('/user', userController.insertUser);
};
