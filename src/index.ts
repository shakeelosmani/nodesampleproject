import 'reflect-metadata';
import {ApiServer} from './server/index';
import {DatabaseProvider} from './database/index';

DatabaseProvider.configure({
    type:process.env.DATABASE_TYPE || "mysql",
    database:process.env.DATABASE_NAME || 'nodesampleappdb',
    username:process.env.DATABASE_USERNAME || 'root',
    password:process.env.DATABASE_PASSWORD || 'root',
    host:process.env.DATABSE_HOST || 'localhost',
    port:+process.env.DATABSE_PORT || 3306,
    ssl:!!process.env.USE_SSL
});

const server = new ApiServer();
server.start(+process.env.PORT || 9000);