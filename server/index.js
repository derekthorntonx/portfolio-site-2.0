import { config } from "dotenv";
config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectsRouter from "./routes/projects.js";
import adminRouter from "./routes/user.js";

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors('*'));
app.use(express.json());
mongoose.set('strictQuery', false);

// Connect to MongoDB Atlas, run server is successful, log error if not
mongoose.connect(CONNECTION_URL).then(() => {app.listen(PORT, () => {`Server running on port ${PORT}`})})
.catch((err) => {console.log(err)});

app.use('/projects', projectsRouter);
app.use('/users', adminRouter);