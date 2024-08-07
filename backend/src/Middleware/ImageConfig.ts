/**
 * Fichier ImageController.ts
 * code source https://github.com/CKANYWHERE/nodejs-typescript-multerexample
 * 
 * code généré par chatGPT URL: https://chatgpt.com
 * 
 * date: 2024-08-07
 * @author Merlin Tourigny
 */
import multer from 'multer'
import path from 'path'

/**
 * Fonction upload qui upload l'image dans le dossier /image
 */
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("middleware");
      cb(null, '../backend/src/Images');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});


export default upload;