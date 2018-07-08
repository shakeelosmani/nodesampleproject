import {HttpServer} from './server';
import * as restify from 'restify';
import {RequestHandler, Server} from 'restify';
import { CONTROLLERS } from '../controllers';

export class ApiServer implements HttpServer{

    private restify:Server

    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute("get", url, requestHandler);
    }    
    
    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute("post", url, requestHandler);
    }
    
    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute("put", url, requestHandler);
    }
    
    public del(url: string, requestHandler: RequestHandler): void {
        this.addRoute("del", url, requestHandler);
    }

    private addRoute(method:'get' | 'post' | 'put' | 'del', url:string, requestHandler:RequestHandler):void {
        this.restify[method](url, async (req, res, next) =>{
            try {
                await requestHandler(req, res, next);
            }
            catch(e) {
                console.log(e);
                res.send(500, e);
            }
        });

        console.log(`Added route ${method.toUpperCase()} : ${url}`);

    }

    public start(port:number):void{
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());

        CONTROLLERS.forEach(contoller => contoller.initialize(this));

        this.restify.listen(port, ()=> console.log( `Server is running on port ${port}`));

    }




}