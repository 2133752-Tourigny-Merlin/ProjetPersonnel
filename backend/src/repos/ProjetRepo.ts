import Projet, { IProjet } from '../models/Projet';
import { connect } from 'mongoose'
import Image from '../models/Image';
import fs from 'fs';

// **** Functions **** //

/**
 * Vérifie si le projet existe.
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
  return projet;
}

/**
 * Lire 3 derniers projets.
 */
async function getRecent(nb: number): Promise<IProjet[]> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Projet' });
  const projets = await Projet.find().sort({ date: -1 }).limit(nb);
  console.log(projets);
  console.log("getRecentRepo");
  return projets;
}

/**
 * Lire les projets selon leurs types
 */
async function getType(type: string): Promise<IProjet[]> {
  await connect(process.env.MONGODB_URI!, { dbName: 'Projet' });
  const projets = await Projet.find({ type }).exec();
  console.log(projets);
  console.log("getType");
  return projets;
}


/**
 * Ajoute un projet.
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
   * Mets à jour un projet.
   */
  async function update(projet: IProjet): Promise<IProjet> {
    await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
    const projetAModifier = await Projet.findByIdAndUpdate(projet._id, projet);
    if (projetAModifier === null) {
      throw new Error('Admin non trouvé');
    }
  
    return projetAModifier;
  }
  
  async function deleteImage(id: string): Promise<void> {
    await connect(process.env.MONGODB_URI!, { dbName: 'Image' });
    const image = await Image.findById(id);
  
    if (image) {
      fs.unlinkSync(image.chemin);
      await Image.findByIdAndDelete(id);
    }
  }

  /**
   * Supprimer un projet.
   */
  async function delete_(id: string): Promise<void> {
    await connect(process.env.MONGODB_URI!, {dbName:'Projet'});
    const projet = await Projet.findById(id);
    if(projet){
       deleteImage(projet.id_image);
    }
   
    await Projet.findByIdAndDelete(id);
  }


// **** Export default **** //

export default {
    persists,
    getAll,
    getOne,
    getRecent,
    getType,
    add,
    update,
    delete_,
} as const;
