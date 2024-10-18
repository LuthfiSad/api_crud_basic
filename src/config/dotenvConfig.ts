import dotenv from 'dotenv'

dotenv.config()

export const environment = {
    MONGODBURL: process.env.MONGODBURL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    // DB_NAME: process.env.DB_NAME,
    // DB_USER: process.env.DB_USER,
    // DB_PASSWORD: process.env.DB_PASSWORD,
    // BASE_IMAGE_FOLDER: process.env.BASE_IMAGE_FOLDER,
    // SMTP_USER: process.env.SMTP_USER,
    // SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    // SMTP_HOST: process.env.SMTP_HOST,
    // SMTP_PORT: process.env.SMTP_PORT,
    // SMTP_LOGIN: process.env.SMTP_LOGIN,
    // EMAIL_SENDER: process.env.EMAIL_SENDER
}