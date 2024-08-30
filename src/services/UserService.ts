import { InsertResult } from 'typeorm';
import md5 from 'md5';

import { AppDataSource } from '../database/data-source';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export const insert = async (nick: string, senha: string): Promise<User> => {
    await AppDataSource.initialize();

    const newUser: User = new User(nick, md5(senha), 'validar');

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
