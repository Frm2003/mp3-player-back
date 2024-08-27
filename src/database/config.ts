import { DataSource } from 'typeorm';
import { User } from '../models/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dev',
    password: '123456',
    database: 'teste',
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
}