import express, { Application } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';
const router = express.Router();

export default function (app: Application) {
  app.use('/api/v1', router);
  
  router.get("/", (_, res) => {
    res.status(200).send("welcome to the api");
  });
  
  readdirSync(__dirname).map(async (file) => {
    if (file.startsWith("index")) return;
    if (!file.endsWith('.map')) {
      (await import(join(__dirname, file))).default(router);
    }
  });
}
