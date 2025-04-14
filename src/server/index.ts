import fastifyCors from '@fastify/cors';
import fastify, { type FastifyInstance } from 'fastify';
import { registerRoutes } from './router/register';

class App {
    private fastify: FastifyInstance;

    constructor() {
        this.fastify = fastify();
        this.injectCors();
        this.registerRoutes();
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

    private registerRoutes = (): void => {
        registerRoutes(this.fastify);
    }

    public start = async (): Promise<void> => {
        const port: number = 8080;

        try {
            console.log('Iniciando servidor ...');
            await this.fastify.listen({ port: port });
            console.log(`Servidor rodando na porta ${port}`);
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
