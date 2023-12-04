import { Router } from "express";
import { router as usersRouter } from "./users";

const router: Router = Router({ mergeParams: true });

router.use("/users", usersRouter);

export { router };
