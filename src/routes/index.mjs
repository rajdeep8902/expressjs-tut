import { Router } from "express";
import userRouter from "./users.mjs";
import prodRouter from "./products.mjs";
const indexRouter=Router();

indexRouter.use(userRouter);
indexRouter.use(prodRouter);

export default indexRouter;

