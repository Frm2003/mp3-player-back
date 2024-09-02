import supertest from 'supertest';

import app from '../src/server/index';

export const testeServer = supertest(app.server);
