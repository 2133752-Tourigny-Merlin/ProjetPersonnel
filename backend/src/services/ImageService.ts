import ImageRepo from '../repos/ImageRepo';
import { IImage } from '../models/Image';
import RouteError from '../common/RouteError';
import HttpStatusCodes from '../common/HttpStatusCodes';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const IMAGE_NOT_FOUND_ERR = 'Image non trouvé';

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../Images'));
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uuid}${ext}`);
  }
});

const upload = multer({ storage: storage }).single('image');

/**
 * Lire toutes les images.
 */
function getAll(): Promise<IImage[]> {
  return ImageRepo.getAll();
}

/**
 * Lire l'image ayant l'id passé en paramètre
 */
function getOne(id: string): Promise<IImage | null> {
  return ImageRepo.getOne(id);
}

/**
 * Ajouter une image.
 */
async function add(req: any, res: any): Promise<void> {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const { nom, taille, type } = req.body;
    const chemin = req.file.path;

    const newImage: IImage = { nom, taille, chemin, type };

    try {
      const savedImage = await ImageRepo.add(newImage);
      return res.status(HttpStatusCodes.CREATED).json(savedImage);
    } catch (err) {
      console.log(err);
      res.status(500).json({ erreur: err.message });
    }
  });
}

/**
 * Supprimer une image par son id.
 */
async function delete_(id: string): Promise<void> {
  const persists = await ImageRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, IMAGE_NOT_FOUND_ERR);
  }
  // Supprimer l'image
  return ImageRepo.delete_(id);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  delete_,
} as const;
