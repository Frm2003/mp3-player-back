import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { routes } from './routes';

export const app = fastify({ logger: true });

app.register(fastifyCors);
app.register(routes);
