import Image, { IImage } from '../models/Image';
import { connect } from 'mongoose';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import HttpStatusCodes from '../common/HttpStatusCodes';

//****image repo *****//

// **** Functions **** //

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../Images'));
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueName}${extension}`);
  }
});

const upload = multer({ storage });
const addImage = upload.single('Image'); // Expect 'image' as the field name

/**
 * Vérifie si l'image existe.
 */
async function persists(id: string): Promise<boolean> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const image = await Image.findById(id);
  return image !== null;
}

/**
 * Lire toutes les images.
 */
async function getAll(): Promise<IImage[]> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const images = await Image.find();
  return images.map(image => ({
    ...image.toObject(),
    chemin: path.join('/images', path.basename(image.chemin)),
  }));
}

/**
 * Lire une image.
 */
async function getOne(id: string): Promise<IImage | null> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const image = await Image.findById(id);
  if (image) {
    const imageWithUrl = {
      ...image.toObject(),
      chemin: path.join('/images', path.basename(image.chemin)),
    };
    return imageWithUrl;
  }
  return null;
}

/**
 * Lire 3 derniers projets.
 */
async function getRecent(): Promise<IImage[]> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const images = await Image.find().sort({ date: -1 }).limit(1);
  return images;
}

/**
 * Ajoute une image.
 */
async function add(image: IImage): Promise<IImage> {
  console.log("addRepo");
  console.log(image);
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const newImage = new Image(image);
  await newImage.save();
  return newImage;
}

/**
 * Supprimer une image.
 */
async function delete_(id: string): Promise<void> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
  const image = await Image.findById(id);

  if (image) {
    fs.unlinkSync(image.chemin);
    await Image.findByIdAndDelete(id);
  }
}

// **** Export default **** //
export default {
  persists,
  getAll,
  getOne,
  getRecent,
  add,
  delete_,
} as const;
