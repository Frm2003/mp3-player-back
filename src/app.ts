import 'reflect-metadata';
import { app } from './server';
import { runMigrations } from './database/data-source';
import 'dotenv/config';

const server = async () => {
    const porta: number = Number(process.env.SERVER_PORT);

    try {
        await runMigrations();

        await app.listen({ port: porta });
        console.log(`server rodando na porta: ${porta}`);
    } catch (error) {
        console.log(error);
    }
};

server();
