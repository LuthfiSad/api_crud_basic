import multer, { FileFilterCallback } from "multer";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { MESSAGES } from "../utils/Messages";
import { ErrorApp } from "../utils/Response.Mapper";
import { Request } from "express";
import path from "path";
import fs from "fs";
import { environment } from "./dotenvConfig";

export interface ImageUploadBodyDTO {
  image: Express.Multer.File;
  linkImage: string;
  pathImage: string;
} 

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

// Set storage engine upload first
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/users'); // Direktori tempat gambar disimpan
//   },

//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Nama file yang disimpan
//   }
// });

// image upload memory
const storage = multer.memoryStorage();

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

export const uploadImage = (Image: Express.Multer.File, filename: string, category: string ) => {
  if (!Image) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_PATH, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const imagePath = path.join(__dirname, "..", "..", environment.BASE_IMAGE_FOLDER as string, category);
  
  
  // Buat folder jika belum ada
  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath, { recursive: true });
  }

  const filePath = path.join(imagePath, filename);

  // Simpan file ke disk dari memory buffer
  fs.writeFileSync(filePath, Image.buffer);
}

// export const getPathImage = (imagePath: string, req: Request) => {
//   const host = req.protocol + '://' + req.get('host');
//   const destination = path.dirname(imagePath); // Mengambil direktori dari path
//   const filename = path.basename(imagePath); // Mengambil nama file dari path
//   return `${host}/${destination}/${filename}`;
// }

export const getLinkImage = (req: Request, category: string) => {
  if (!req.file) {
    return ['', '']
  }
  const host = req.protocol + '://' + req.get('host');
  const filename = `${Date.now()}-${req.file?.originalname}`;
  return [host + '/' + category + '/image/' + filename, filename]
}

export const getPathImage = (imagePath: string, category: string) => {
  const fullPath = path.join(__dirname, '..', '..', (environment.BASE_IMAGE_FOLDER as string), category, imagePath);
  return fullPath
}

export const deleteImage = (imageUrl: string, category: string) => {
  const imagePath = imageUrl.split('/').pop(); // Mengambil path dari URL

  const fullPath = path.join(__dirname, '..', '..', (environment.BASE_IMAGE_FOLDER as string), category, imagePath as string);
  
  fs.unlink(fullPath, (err) => {
    if (err) {
      return false
    }
  });
  return true
};