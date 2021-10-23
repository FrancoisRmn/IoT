import express from "express";
import "es6-shim";
import { mainRoute } from "./routes/mainRoute";

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
    }

    private configRoutes():void{
        this.app.use('/main',mainRoute);
    }

}

export default new App().app;