import { Router } from "express";
import { get } from "./get";

import multer from "multer";
import { post } from "./post";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router: Router = Router({ mergeParams: true });

router.get("/", get);
router.post("/", upload.single("file"), post);

export { router };
