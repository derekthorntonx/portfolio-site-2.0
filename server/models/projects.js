import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: String,
    codeLink: String,
    demoLink: String,
    tags: [],
    description: String,
    imgSource: String,
    showcase: Boolean
});

const Project = mongoose.model('Project', projectSchema);

export default Project;