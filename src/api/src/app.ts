import express from "express";
import "es6-shim";
import {wakeUpRoute } from "./routes/wakeUpRoute";
class App {

    public app: express.Application;
    constructor() {
        this.app = express();
        this.baseConfig();
        this.configRoutes()
    }

    private baseConfig(): void{
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
              'Access-Control-Allow-Headers',
              'Origin, X-Requested-With, Content-Type, Accept',
            );
            next();
          });
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    private configRoutes():void{
        this.app.use('/wakeup',wakeUpRoute);
    }

}

export default new App().app;