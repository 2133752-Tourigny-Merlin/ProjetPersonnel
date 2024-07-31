import Projet, { IProjet } from '../models/Projet';
import { connect } from 'mongoose'
// **** Functions **** //

/**
 * Vérifie si l'admin existe.
 */
async function persists(id: string): Promise<boolean> {
  const projet = await Projet.findById(id);
  return projet !== null;
}

/**
 * Lire tous les projets.
 */
async function getAll(): Promise<IProjet[]> {
  await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
  const projets = await Projet.find();
  return projets;
}

/**
 * Lire un projet.
 */
async function getOne(id: string): Promise<IProjet | null> {
  await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
  const projet = await Projet.findById(id);
  console.log(projet);
  return projet;
}

/**
 * Lire 3 derniers projets.
 */
async function GetRecent(nb: number): Promise<IProjet[]> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Projet' });
  const projets = await Projet.find().sort({ date: -1 }).limit(nb);
  console.log(projets);
  console.log("getRecentRepo");
  return projets;
}

/**
 * Ajoute un admin.
 */
async function add(projet: IProjet): Promise<IProjet> {
  console.log(projet);
  console.log("add repo");
    await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
    const nouveauProjet = new Projet(projet);
    await nouveauProjet.save();
    return nouveauProjet;
  }
  
  /**
   * Mets à jour un admin.
   */
  async function update(projet: IProjet): Promise<IProjet> {
    await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
    const projetAModifier = await Projet.findByIdAndUpdate(projet._id, projet);
    if (projetAModifier === null) {
      throw new Error('Admin non trouvé');
    }
  
    return projetAModifier;
  }
  
  /**
   * Supprimer un admin.
   */
  async function delete_(id: string): Promise<void> {
    await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
    await Projet.findByIdAndDelete(id);
  }


// **** Export default **** //

export default {
    persists,
    getAll,
    getOne,
    GetRecent,
    add,
    update,
    delete_,
} as const;