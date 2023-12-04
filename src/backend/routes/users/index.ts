import { Router } from "express";
import { get } from "./get";
import { post } from "./post";
import { router as userFilesRouter } from "./:user/files";
import { parseUserParam } from "../../controllers/parse-user";

const router: Router = Router({ mergeParams: true });

router.get("/", get);
router.post("/", post);
router.use("/:user/files", parseUserParam, userFilesRouter);

export { router };
