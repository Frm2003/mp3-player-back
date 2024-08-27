import "reflect-metadata";
import { app } from './server';
import { runMigrations } from "./database/data-source";


console.log(process.env)

const server = async () => {
    const porta: number = 3001;

    try {
        //await runMigrations();

        await app.listen({ port: porta });
        console.log(`server rodando na porta: ${porta}`);
    } catch (error) {
        console.log(error);
    }

};

server();
