import {config} from 'dotenv';

config();

export const _dbName = process.env.API_DB_NAME;
export const _dbPort = process.env.API_DB_PORT;
export const _dbHost = process.env.API_DB_HOST;
export const _dbUser = process.env.API_DB_USER;
export const _dbPassword = process.env.API_DB_PASSWORD;
export const _apiPort = process.env.API_PORT;
export const _dbSync = process.env.API_DB_SYNC === "true" ? true : false;
export const _isProd = process.env.API_IS_PROD === "true" ? true : false;
export const _secretSession = process.env.API_SECRET_SESSION;
export const _clientURL = process.env.API_CLIENT_URL;
export const _token = process.env.TOKEN_SECRET;
export const _s3KeyId = process.env.Q_ACCESS_KEY_ID;
export const _s3Secret = process.env.Q_SECRET_ACCESS_KEY;
export const _s3Region = process.env.Q_AWS_REGION;
export const _s3Bucket = process.env.Q_S3_BUCKET;
