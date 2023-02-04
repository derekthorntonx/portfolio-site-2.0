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