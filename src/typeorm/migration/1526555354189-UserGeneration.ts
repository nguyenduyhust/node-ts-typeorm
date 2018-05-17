import {MigrationInterface, QueryRunner} from "typeorm";

export class UserGeneration1526555354189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL UNIQUE, `password` varchar(1024) NOT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
