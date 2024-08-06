import express,{Response,Request} from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path';
import Image, { IImage } from '../models/Image';
import { connect } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';
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

async function getOne(id: string): Promise<string | null> {
    await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
    const image = await Image.findById(id);
    if (image) {
        return image.nom; // Assuming 'nom' is the filename
    } else {
        return null;
    }
}

/*
 * get Image
 * route @GET
 */
/*
 * get Image
 * route @GET
 */
export const getImage = async (req: Request, res: Response) => {
    const fileId = req.params.id;

    console.log(`${fileId} test`);
    const fileName = await getOne(fileId);
    console.log(`${fileName} test`);

    if (!fileName) {
        res.status(404).send('Image not found');
        return;
    }

    const filePath = path.join('H:/projet/ProjetPersonnel/backend/src/Images/', fileName);
    console.log(filePath + " test");
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, send default image
            const defaultImagePath = path.join('H:/projet/ProjetPersonnel/backend/src/Images/NoImage/noimage.jpg');
            console.log(`Default image path: ${defaultImagePath}`);

            fs.readFile(defaultImagePath, (err, data) => {
                if (err) {
                    console.error('Error reading default image:', err);
                    res.status(500).send('Error loading default image');
                } else {
                    res.setHeader('Content-Type', 'image/jpeg'); // Set the correct content type
                    res.end(data);
                }
            });
        } else {
            // File exists, send the image
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('Error reading image:', err);
                    res.status(500).send('Error loading image');
                } else {
                    res.setHeader('Content-Type', 'image/jpeg'); // Set the correct content type
                    res.end(data);
                }
            });
        }
    });
};
