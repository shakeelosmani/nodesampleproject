import {HttpServer} from '../server/server';

export interface Controller {
    initialize(httpServer:HttpServer):void;
}