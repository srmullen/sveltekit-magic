import dotenv from 'dotenv';

dotenv.config();

export const TOKEN_NAME = 'session';
export const SESSION_LENGTH_MS = Number.parseInt(process.env['SESSION_LENGTH_MS']);

export const MAGIC_SECRET_KEY = process.env['MAGIC_SECRET_KEY'];
export const JWT_SECRET = process.env['JWT_SECRET'];