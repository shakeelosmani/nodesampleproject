import { Connection, createConnection } from "typeorm";
import { Customer } from "../models/customer";

export interface DatabaseConfiguration {
    type:string,
    host:string,
    port:number,
    username:string,
    password:string,
    database:string,
    ssl?:boolean
}

export class DatabaseProvider{
    private static connection: Connection;
    private static configuration:DatabaseConfiguration;

    public static configure(config: DatabaseConfiguration): void{
        DatabaseProvider.configuration = config;
    }

    public static async getConnected(): Promise<Connection>{
        if(DatabaseProvider.connection){
            return DatabaseProvider.connection;
        }

        const {type, host, port, username, password, database, ssl} = DatabaseProvider.configuration;
        
        DatabaseProvider.connection = await createConnection({
           type:'mysql', host, port, username, password, database,
           extra:{
               ssl
           },
           entities:[Customer],
           synchronize: true
        });
        return DatabaseProvider.connection;
    }
}