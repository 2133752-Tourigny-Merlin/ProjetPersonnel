import express,{Response,Request} from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path';
import Image from '../models/Image';
/*
* save image
* route @POST
*/
export const postImage = async (req: Request, res: Response) => {
    if (req.file) {
        const { filename, path, mimetype, size } = req.file;

        const newImage = new Image({
            nom: filename,
            chemin: path,
            type: mimetype,
            taille: size,
            dateCreation: new Date(),
        });
        console.log(newImage);
        await newImage.save();

        res.json({ message: 'File uploaded successfully', file: req.file });
    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
}

/*
* get Image
* route @GET
*/
/*
// Get image route @GET
export const getImage = async (req: Request, res: Response) => {
    const fileName = req.params.id;
    const imagePath = path.join(__dirname, '../Images', fileName);
    const noImagePath = path.join(__dirname, '../Images/NoImage', 'noimage.jpg');

    try {
        const exists = await fs.promises.access(imagePath).then(() => true).catch(() => false);
        const filePath = exists ? imagePath : noImagePath;
        const data = await fs.promises.readFile(filePath);
        res.end(data);
    } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).json({ message: 'Error reading file' });
    }
};


export const test = async(req: Request, res: Response) => {
    res.send('test')
}*/

export default postImage;