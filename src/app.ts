import { app } from './server';

const server = async () => {
	try {
		await app.listen({ port: 8000 });
		console.log(`servidor rodando na porta: ${8080}`);
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

server();
