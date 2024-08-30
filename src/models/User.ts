import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: 'varchar', length: 100 }) nick: string;

    @Column({ type: 'varchar', length: 50 }) senha: string;

    @Column({ type: 'date' }) createOn: Date;

    @Column({ type: 'date' }) updateOn: Date;

    @Column({ type: 'varchar', length: 25 }) situacao: string;

    constructor(nick: string, senha: string, situacao: string) {
        this.id = 0;
        this.nick = nick;
        this.senha = senha;
        this.createOn = new Date();
        this.updateOn = new Date();
        this.situacao = situacao;
    }
}
