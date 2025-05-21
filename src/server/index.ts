import fastifyCors from '@fastify/cors';
import fastify, { type FastifyInstance } from 'fastify';
import { controllerMap, registerControllers } from './router/registerControllers';
import { registerServices, serviceMap } from './router/registerServices';

class App {
    private fastify: FastifyInstance;

    constructor() {
        this.fastify = fastify();
        this.injectCors();
    }

    private injectCors = (): void => {
        try {
            console.log('Injetando CORS ...');
            this.fastify.register(fastifyCors);
            console.log('CORS injetado com sucesso');
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    };

    private scanPackages = async (): Promise<void> => {
        console.log('Instanciando Services...')
        await registerServices();
        console.log(`Services instanciadas: ${serviceMap.size}`)
        console.log('Instanciando Controllers...')
        await registerControllers(this.fastify, serviceMap);
        console.log(`Controllers instanciadas: ${controllerMap.size}`)
    }

    public start = async (): Promise<void> => {
        const port: number = 8080;

        try {
            await this.scanPackages();
            console.log('Iniciando servidor ...');
            await this.fastify.listen({ port: port });
            console.log(`Servidor rodando na porta ${port}`);
            console.log(`-----------------------------------------`);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }

        process.on('SIGINT', async () => {
            console.log('Fechando o servidor...');
            await this.fastify.close();
            process.exit(0);
        });
    }
}

const app = new App();

export default app;
