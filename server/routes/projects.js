import { getProjects, getShowcases, toggleShowcase, createProject, deleteProject } from "../controllers/projects.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { deleteImage } from "../middleware/deleteImage.js";
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './projectImages/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //handle accepts
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'){
    cb(null, true)
    } else {
    //handle rejects
    cb(new Error('File type not allowed'), false)
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});



const projectsRouter = express.Router();
projectsRouter.get('/showcase', getShowcases);
projectsRouter.get('/all', getProjects);
projectsRouter.delete('/:_id', checkAuth, deleteImage, deleteProject);
projectsRouter.post('/create', checkAuth, upload.single('projectImage'), createProject);
projectsRouter.post('/:_id', checkAuth, toggleShowcase);                                    // This route comes AFTER generic route to avoid calling improper route

export default projectsRouter;