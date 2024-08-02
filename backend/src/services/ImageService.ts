import ImageRepo from '../repos/ImageRepo';
import { IImage } from '../models/Image';
import RouteError from '../common/RouteError';
import HttpStatusCodes from '../common/HttpStatusCodes';

export const IMAGE_NOT_FOUND_ERR = 'Image non trouvé';

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
 * Lire toutes les images.
 */
function getRecent(): Promise<IImage[]> {
  return ImageRepo.getRecent();
}


// Add an image
function add(image: IImage): Promise<IImage>{
  console.log(image + "addService");
  return ImageRepo.add(image);
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
  getRecent,
  add,
  delete_,
} as const;
