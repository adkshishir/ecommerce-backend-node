import { NextFunction, Request, Response } from 'express';
import multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'public/images');
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage }).single('image');

function uploadWithMulter(req: Request, res: Response, next: NextFunction) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        // The request contained unexpected files.
        return res.status(400).send('Only one file allowed');
      }
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).send('An unknown error occurred');
    }
    // No error occurred, continue to the next middleware
    next();
  });
}
export { uploadWithMulter };
export default upload;
