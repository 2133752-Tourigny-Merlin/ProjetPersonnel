import ProjetRepo from '../repos/ProjetRepo';
import { IProjet } from '../models/Projet';
import RouteError from '../common/RouteError';
import HttpStatusCodes from '../common/HttpStatusCodes';

// **** Variables **** //

export const PROJET_NOT_FOUND_ERR = 'Projet non trouvé';

// **** Functions **** //

/**
 * Lire tout les projets.
 */
function getAll(): Promise<IProjet[]> {
  return ProjetRepo.getAll();
}

/*
* Lire un projet selon l'id
*/
function getOne(id: string): Promise<IProjet | null> {
    return ProjetRepo.getOne(id);
}

/**
 * Lire les 3 derniers projets.
 */
function getRecent(nb: number): Promise<IProjet[]> {
  console.log("getRecentService");
  return ProjetRepo.getRecent(nb);
}

/**
 * Lire les 3 derniers projets.
 */
function getType(type: string): Promise<IProjet[]> {
  console.log("getType");
  return ProjetRepo.getType(type);
}

/**
 * Ajouter d'un projet.
 */
function add(projet: IProjet): Promise<IProjet> {
  return ProjetRepo.add(projet);
}

/**
 * Mise à jour d'un projet.
 */
async function update(projet: IProjet): Promise<IProjet> {
  const persists = await ProjetRepo.persists(projet._id!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PROJET_NOT_FOUND_ERR);
  }
  return ProjetRepo.update(projet);
}

/**
 * Supprimer un projet par son id.
 */
async function delete_(id: string): Promise<void> {
    const persists = await ProjetRepo.persists(id);
    if (!persists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, PROJET_NOT_FOUND_ERR);
    }
    return ProjetRepo.delete_(id);
  }


// **** Export default **** //

export default {
  getAll,
  getOne,
  getRecent,
  getType,
  add,
  update,
  delete_,
} as const;
