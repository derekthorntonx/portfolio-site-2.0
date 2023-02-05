import { userLogin } from "../controllers/user.js";
import express from "express";

const adminRouter = express.Router();

adminRouter.post('/login', userLogin)

export default adminRouter;