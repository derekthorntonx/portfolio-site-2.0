import { promises as fs } from 'fs';

export const deleteImage = async (req, res, next) => {
    let image = req.body.path;
    console.log('it got to middleware')
    console.log(req.body.path)
    try {
        await fs.unlink(`${image}`)
        res.status(200);
        next();
    } catch {
        res.status(500).json({message:'Failed to delete image.'});
        console.log('Failed to delete file in middleware.')
    }
}