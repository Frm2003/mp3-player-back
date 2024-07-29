import { app } from './server';

const server = async () => {
    const porta = 3001

    try {
        await app.listen({ port: porta });
        console.log(`servidor rodando na porta ${porta}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

server();