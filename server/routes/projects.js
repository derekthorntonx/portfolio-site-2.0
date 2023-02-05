import { getProjects, getShowcases, toggleShowcase } from "../controllers/projects.js";
import { checkAuth } from "../middleware/checkAuth.js";
import express from "express";

const projectsRouter = express.Router();

projectsRouter.get('/showcase', getShowcases);
projectsRouter.get('/all', getProjects);
projectsRouter.post('/:_id', checkAuth, toggleShowcase);

export default projectsRouter;