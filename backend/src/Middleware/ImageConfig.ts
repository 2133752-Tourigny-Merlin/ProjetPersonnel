import multer from 'multer'
import path from 'path'


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