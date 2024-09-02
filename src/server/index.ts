import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { routes } from './routes';

const app = fastify({ logger: true });

app.register(fastifyCors);
app.register(routes);

export default app;
