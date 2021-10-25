import { compileFromFile } from "json-schema-to-typescript";
import app from "./app";
import * as fs from 'fs';

require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`*** Express server listening on port ${process.env.PORT} ***`);

    // compile from file
    compileFromFile('src/WakeUpConfigSchema.json')
    .then(ts => fs.writeFileSync('src/models/wake-up-config/WakeUpConfigModel.d.ts', ts))
})