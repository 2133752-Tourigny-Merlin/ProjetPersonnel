import HttpStatusCodes from '../common/HttpStatusCodes';

import ProjetService from '../services/ProjetService';
import { IProjet } from '../models/Projet';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get tout les projets.
 */
async function getAll(_: IReq, res: IRes) {
  const projet = await ProjetService.getAll();
  return res.status(HttpStatusCodes.OK).json({ projet });
}

/**
 * Get un projet selon l'id'
 */
async function getOne(req: IReq, res: IRes) {
    const id = req.params.id;
    const projet = await ProjetService.getOne(id);
    return res.status(HttpStatusCodes.OK).json({ projet });
}

/**
 * Get dernier 3 projets
 */
async function getRecent(req: IReq, res: IRes) {
  console.log("getRecentRoute");
  const nb = Number(req.params.nb);
  const Projet = await ProjetService.getRecent(nb);
  return res.status(HttpStatusCodes.OK).json({ Projet });
}

/**
 * Add un projet.
 */
async function add(req: IReq<{Projet: IProjet}>, res: IRes) {
  const { Projet } = req.body;
  await ProjetService.add(Projet);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update un projet.
 */
async function update(req: IReq<{Projet: IProjet}>, res: IRes) {
  const { Projet } = req.body;
  await ProjetService.update(Projet);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete un admin.
 */
async function delete_(req: IReq, res: IRes) {
    const id = req.params.id;
    await ProjetService.delete_(id);
    return res.status(HttpStatusCodes.OK).end();
  }


// **** Export default **** //

export default {
  getAll,
  getOne,
  getRecent,
  add,
  update,
  delete_,
} as const;
