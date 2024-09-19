
import z from "zod"
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("8000"),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRE: z.string(),
    ACCESS_TOKEN_EXPIRE: z.string(),
    CLOUDINARY_NAME :z.string(),
    CLOUDINARY_SECRET_KEY:z.string(),
    CLOUDINARY_KEY:z.string()


})

const env = envSchema.parse(process.env)
export default env;