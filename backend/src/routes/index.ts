import { NextFunction, Request, Response, Router } from 'express';

import Paths from '../common/Paths';
import Projet from '../models/Projet';
import Image from '../models/Image';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ProjetRoutes from './ProjetRoutes';
import ImageRoutes from './ImageRoutes';

// **** Variables **** //

const apiRouter = Router();

// ** Validation d'un projet ** //
function projetValide(req: Request, res: Response, next: NextFunction) {
  const nouveauProjet = new Projet(req.body.Projet);
  console.log(nouveauProjet);
  const error = nouveauProjet.validateSync();
  console.log(error);
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// ** Validation d'un projet ** //
function imageValide(req: Request, res: Response, next: NextFunction) {
  const nouvelleImage = new Image(req.body.Image);
  console.log(nouvelleImage);
  const error = nouvelleImage.validateSync();
  console.log(error);
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// ** Ajoute Router ** //

const ProjetRouter = Router();
const ImageRouter = Router();
//** Projets **/

//Lire tout les velos
ProjetRouter.get(Paths.Projet.GetAll, ProjetRoutes.getAll);

//Lire un seul velo
ProjetRouter.get(Paths.Projet.GetOne, ProjetRoutes.getOne);

//Lire 3 projets
ProjetRouter.get(Paths.Projet.GetRecent, ProjetRoutes.getRecent);

//Ajoute un velo
ProjetRouter.post(Paths.Projet.Add, projetValide, ProjetRoutes.add);

//Mettre à jour un velo
ProjetRouter.put(Paths.Projet.Update, projetValide, ProjetRoutes.update);

//Supprime un velo
ProjetRouter.delete(Paths.Projet.Delete, ProjetRoutes.delete_);

//Lire tout les velos
ImageRouter.get(Paths.Image.GetAll, ImageRoutes.getAll);

//Lire un seul velo
ImageRouter.get(Paths.Image.GetOne, ImageRoutes.getOne);

//Ajoute un velo
ImageRouter.post(Paths.Image.Add, imageValide, ImageRoutes.add);

//Supprime un velo
ImageRouter.delete(Paths.Image.Delete, ImageRoutes.delete_);

//** Stats **/

// Add AdminRouter
apiRouter.use(Paths.Projet.Base, ProjetRouter);

apiRouter.use(Paths.Image.Base, ImageRouter);

// **** Export default **** //

export default apiRouter;