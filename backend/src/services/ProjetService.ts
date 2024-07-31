import ProjetRepo from '../repos/ProjetRepo';
import { IProjet } from '../models/Projet';
import RouteError from '../common/RouteError';
import HttpStatusCodes from '../common/HttpStatusCodes';

// **** Variables **** //

export const VELO_NOT_FOUND_ERR = 'Velo non trouvé';

// **** Functions **** //

/**
 * Lire toutes les Factures.
 */
function getAll(): Promise<IProjet[]> {
  return ProjetRepo.getAll();
}

/*
* Lire le velo ayant l'id passé en paramètre
*/
function getOne(id: string): Promise<IProjet | null> {
    return ProjetRepo.getOne(id);
}

/**
 * Lire les 3 derniers projets.
 */
function getRecent(nb: number): Promise<IProjet[]> {
  console.log("getRecentService");
  return ProjetRepo.GetRecent(nb);
}

/**
 * Ajouter d'un velo.
 */
function add(projet: IProjet): Promise<IProjet> {
  return ProjetRepo.add(projet);
}

/**
 * Mise à jour d'un velo.
 */
async function update(projet: IProjet): Promise<IProjet> {
  const persists = await ProjetRepo.persists(projet._id!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VELO_NOT_FOUND_ERR);
  }
  return ProjetRepo.update(projet);
}

/**
 * Supprimer un velo par son id.
 */
async function delete_(id: string): Promise<void> {
    const persists = await ProjetRepo.persists(id);
    if (!persists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, VELO_NOT_FOUND_ERR);
    }
    // Supprimer le velo
    return ProjetRepo.delete_(id);
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
