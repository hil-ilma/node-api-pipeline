import { config } from "dotenv";
config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });


export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "db";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
export const DB_DATABASE = process.env.DB_DATABASE || "companydb";
export const DB_PORT = process.env.DB_PORT || 3306;
