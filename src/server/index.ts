import Fastify from 'fastify';
import cors from '@fastify/cors'; // Importe o plugin CORS corretamente

import { routes } from '../routes';

export const app = Fastify({ logger: true });

app.register(cors); // Registre o plugin CORS
app.register(routes); // Registre suas rotas
