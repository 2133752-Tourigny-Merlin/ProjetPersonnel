import HttpStatusCodes from '../common/HttpStatusCodes';

import ImageService from '../services/ImageService';
import { IImage } from '../models/Image';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get tout les projets.
 */
async function getAll(_: IReq, res: IRes) {
  const image = await ImageService.getAll();
  return res.status(HttpStatusCodes.OK).json({ image });
}

/**
 * Get un projet selon l'id'
 */
async function getOne(req: IReq, res: IRes) {
    const id = req.params.id;
    const image = await ImageService.getOne(id);
    return res.status(HttpStatusCodes.OK).json({ image });
}

/**
 * Get un projet selon l'id'
 */
async function getRecent(req: IReq, res: IRes) {
  const image = await ImageService.getRecent();
  return res.status(HttpStatusCodes.OK).json({ image });
}

/**
 * Add un projet.
 */
async function add(req: IReq<{Image: IImage}>, res: IRes) {
  const { Image } = req.body;
  console.log("addRoutes");
  await ImageService.add(Image);
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * Delete un admin.
 */
async function delete_(req: IReq, res: IRes) {
    const id = req.params.id;
    await ImageService.delete_(id);
    return res.status(HttpStatusCodes.OK).end();
  }


// **** Export default **** //

export default {
  getAll,
  getOne,
  getRecent,
  add,
  delete_,
} as const;
