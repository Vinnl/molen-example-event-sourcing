import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateColumns1536840846697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
    }

}
