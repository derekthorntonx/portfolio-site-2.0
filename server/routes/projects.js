import { getShowcases } from "../controllers/projects.js";
import express from "express";

const projectsRouter = express.Router();

projectsRouter.get('/showcase', getShowcases);

export default projectsRouter;