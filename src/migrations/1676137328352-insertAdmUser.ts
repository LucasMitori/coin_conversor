import { MigrationInterface, QueryRunner } from "typeorm";

export class insertAdmUser1676137328352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(email, "password", "name", "isAdm") VALUES ('admin@mail.com', '$2y$10$yhNAYgXZjtUvgArKO9h/O.s30.YlhLnHWKhxHJ6fDjlenBTUN7d4G','Administrator', TRUE);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email = 'admin@mail.com';`
    );
  }
}
