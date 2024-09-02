import { InsertResult } from 'typeorm';
import md5 from 'md5';

import { AppDataSource } from '../database/data-source';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export const insert = async (nome: string, senha: string): Promise<User> => {
    if (nome == '' || senha == '') throw 'há campos em branco';

    await AppDataSource.initialize();

    const newUser: User = new User(nome, md5(senha), 'validar');

    const result: InsertResult = await userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .returning('*')
        .execute();

    await AppDataSource.destroy();

    return result.raw[0] as User;
};
