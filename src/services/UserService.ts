import { InsertResult } from "typeorm";
import { AppDataSource } from "../database/config";
import { User } from "../models/User";
import md5 from 'md5';

const userRepository = AppDataSource.getRepository(User);

export const insert = async (nick: string, senha: string): Promise<User> => {
    await AppDataSource.initialize();

    const newUser: User = new User(nick, md5(senha), 'validar');

    const result: InsertResult = await userRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .returning('*')
        .execute();

    await AppDataSource.destroy();

    return result.raw[0] as User;
}
