import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrations1724705810871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nick',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'senha',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'createOn',
                    type: 'date',
                },
                {
                    name: 'updateOn',
                    type: 'date',
                },
                {
                    name: 'situacao',
                    type: 'varchar',
                    length: '25',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
