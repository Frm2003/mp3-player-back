import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';
import { schemas } from '../middleware/schemas';

export const routes = async (fastify: FastifyInstance) => {
    // ADICIONA ESQUEMAS DE VAILIDAÇÃO PARA AS ROTAS
    for (const key in schemas) {
        fastify.addSchema(schemas[key]);
    }

    //ROTA TESTE
    fastify.get('/', async (req, res) => {
        return res.status(200).send('teste')
    })

    //ROTAS USER
    fastify.get(
        '/user:id',
        UserController.validationQuery,
        UserController.selectById
    );
    fastify.post('/user', UserController.validationBody, UserController.insert);
};
