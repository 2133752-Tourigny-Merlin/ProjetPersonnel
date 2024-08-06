import { NextFunction, Request, Response, Router } from 'express';
import Paths from '../common/Paths';
import Projet from '../models/Projet';
import Image from '../models/Image';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ProjetRoutes from './ProjetRoutes';
import ImageRoutes from './ImageRoutes';
import upload from "../Middleware/ImageConfig";
import * as imageController from '../Controller/ImageController';
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

// ** Ajoute Router ** //

const ProjetRouter = Router();
const ImageRouter = Router();

//** Projets **/

ProjetRouter.get(Paths.Projet.GetAll, ProjetRoutes.getAll);
ProjetRouter.get(Paths.Projet.GetOne, ProjetRoutes.getOne);
ProjetRouter.get(Paths.Projet.GetRecent, ProjetRoutes.getRecent);
ProjetRouter.get(Paths.Projet.GetType, ProjetRoutes.getType);
ProjetRouter.post(Paths.Projet.Add, projetValide, ProjetRoutes.add);
ProjetRouter.put(Paths.Projet.Update, projetValide, ProjetRoutes.update);
ProjetRouter.delete(Paths.Projet.Delete, ProjetRoutes.delete_);

//** Images **/

ImageRouter.get(Paths.Image.GetAll, ImageRoutes.getAll);
ImageRouter.get(Paths.Image.GetOne, imageController.getImage);
ImageRouter.get(Paths.Image.GetRecent, ImageRoutes.getRecent);
ImageRouter.delete(Paths.Image.Delete, ImageRoutes.delete_);
ImageRouter.post(Paths.Image.Add, upload.single('image'), imageController.postImage);


//** Stats **/

// Add AdminRouter
apiRouter.use(Paths.Projet.Base, ProjetRouter);
apiRouter.use(Paths.Image.Base, ImageRouter);

// **** Export default **** //
export default apiRouter;
