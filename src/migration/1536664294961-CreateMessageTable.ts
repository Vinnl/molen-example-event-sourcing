import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMessageTable1536664294961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" text NOT NULL, "user" character varying NOT NULL, CONSTRAINT "PK_4fdaa0b2e988e5c63e75c7f7b54" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
