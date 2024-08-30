import { DataSource } from 'typeorm';

import { User } from '../models/User';
import 'dotenv/config';

const { HOST, USER, DB, PASSWORD } = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: 5432,
    username: USER,
    password: PASSWORD,
    database: DB,
    entities: [User],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
});

export const runMigrations = async () => {
    try {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();

        console.log('Migrations have been run successfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
    } finally {
        await AppDataSource.destroy();
    }
};
