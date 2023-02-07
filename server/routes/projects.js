import { getProjects, getShowcases, toggleShowcase, createProject, deleteProject } from "../controllers/projects.js";
import { checkAuth } from "../middleware/checkAuth.js";
import express from "express";
import multer from 'multer';

// Set path to static folder for image uploads
const upload = multer({dest: 'projectImages/'});

const projectsRouter = express.Router();
projectsRouter.get('/showcase', getShowcases);
projectsRouter.get('/all', getProjects);
projectsRouter.delete('/:_id', checkAuth, deleteProject);
projectsRouter.post('/create', checkAuth, upload.single('projectImage'), createProject);
projectsRouter.post('/:_id', checkAuth, toggleShowcase);                                    // This route comes AFTER generic route to avoid calling improper route

export default projectsRouter;