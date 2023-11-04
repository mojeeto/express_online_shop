import { Router } from "express";
import { get404, get500 } from "../controller/errors";

const router = Router();

router.get("/500", get500);

router.use(get404);

export default router;
