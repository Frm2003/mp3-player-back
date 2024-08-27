import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user';

export const routes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/', (req, res) => res.status(200).send('teste'))

    //ROTAS PARA USUÁRIO
    fastify.post('/user', UserController.insertUser);
};
