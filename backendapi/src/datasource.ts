import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "backendapi",
    entities: ["src/entity/**/*.ts"],
    logging: true,
    synchronize: true,
    migrationsRun: true,
    migrationsTableName: "migrations"


})