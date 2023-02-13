import Project from '../models/projects.js';

// Query for documents marked with showcase: true
export const getShowcases = async (req, res) => {
    try {
        const showcaseItems = await Project.find({showcase: true});
        res.status(200).json(showcaseItems);
    } catch (error) {
        console.log(error);
    }
}

// Query for all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
    }
}

// Find document by ID then update showcase to true/false
export const toggleShowcase = async (req, res) => {
    const projectID = req.params._id;
    const target = await Project.findById(projectID);
    if (target.showcase){
        const updated = await Project.findByIdAndUpdate(projectID, {showcase: false});
        res.status(200).json(updated);
    } else {
        const updated = await Project.findByIdAndUpdate(projectID, {showcase: true});
        res.status(200).json(updated);
    }
}

// Create new project document
export const createProject = async (req, res) => {
    try {
    const project =  new Project({
        title: req.body.title,
        codeLink: req.body.codeLink,
        demoLink: req.body.demoLink,
        description: req.body.description,
        imgSource: req.file.path,
        showcase: false,
        tags: req.body.tags
    })
    console.log('Project created.');
    console.log(req.file, 'this is req.file')
    console.log(req.body)
    project.save();
    res.status(200).json({message: 'Project successfully created.'})
    } catch(err) {
        console.log('failed');
    }
}
 
//Delete project via id
export const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params._id);
        res.status(200).json({message: 'Project deleted.'});
    } catch (error) {
        res.status(400).json({message: 'Failed to delete.'})
    }
}