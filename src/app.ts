import 'dotenv/config';
import 'reflect-metadata';

import app from './server';

const runServer = () => app.start();

runServer();