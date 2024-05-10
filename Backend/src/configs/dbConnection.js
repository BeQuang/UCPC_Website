import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_DATABASE || 'ucpc_register', process.env.DB_USER || 'root', null, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}