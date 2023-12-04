import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { router } from "./routes";

const startApp = () => {
  const app: Express = express();
  app.use(
    cors({
      origin: "*",
    }),
  );
  app.use(express.json());

  app.use(router);

  app.use((_req, res, _next) => {
    console.log(`Not found ${_req.url}`);
    res.sendStatus(404);
  });

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.sendStatus(500);
  });
  return app;
};

const app = startApp();
export { app };
