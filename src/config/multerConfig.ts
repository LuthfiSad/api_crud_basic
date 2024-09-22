import multer, { FileFilterCallback } from "multer";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { MESSAGES } from "../utils/Messages";
import { ErrorApp } from "../utils/Response.Mapper";
import { Request } from "express";

// // config cloudinary
// cloudinary.config({
//   cloud_name: environment.CLOUDINARY_CLOUD_NAME,
//   api_key: environment.CLOUDINARY_API_KEY,
//   api_secret: environment.CLOUDINARY_API_SECRET
// });

// // Konfigurasi Multer-Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//       public_id: () => `acara/${+new Date()}`,
//   },
// });

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users'); // Direktori tempat gambar disimpan
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nama file yang disimpan
  }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
  ) {
      cb(null, true);
  } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cb(new ErrorApp(MESSAGES.ERROR.INVALID.FILE_TYPE, 400, MESSAGE_CODE.BAD_REQUEST) as any, false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export { upload };